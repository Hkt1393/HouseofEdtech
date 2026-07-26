import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, type ImageStyle, type ViewStyle } from 'react-native';
import type {
  ImageErrorEventData,
  ImageLoadEventData,
  ImageProgressEventData,
} from 'expo-image';

import { APP_STRINGS } from '../../../constants';
import { useTheme } from '../../../theme';

import { resolveColorToken, resolveRadiusValue } from '../shared';

import { createDynamicStyles } from './styles';
import type { AppImageProps } from './types';
import { AppImageView } from './view';

const AppImageContainerComponent = ({
  accessibilityLabel,
  fallbackSource,
  imageStyle,
  onError,
  onLoad,
  onLoadEnd,
  onLoadStart,
  onProgress,
  placeholderSource,
  radius,
  source,
  style,
  tintColorToken,
  transitionDuration,
  ...restProps
}: AppImageProps) => {
  const { animation, colors, radius: radiusScale, spacing } = useTheme();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(source));
  const [useFallbackSource, setUseFallbackSource] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoading(Boolean(source));
    setUseFallbackSource(false);
  }, [fallbackSource, source]);

  const handleLoadStart = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    onLoadStart?.();
  }, [onLoadStart]);

  const handleLoad = useCallback(
    (event: ImageLoadEventData) => {
      setHasError(false);
      onLoad?.(event);
    },
    [onLoad],
  );

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    onLoadEnd?.();
  }, [onLoadEnd]);

  const handleProgress = useCallback(
    (event: ImageProgressEventData) => {
      onProgress?.(event);
    },
    [onProgress],
  );

  const handleError = useCallback(
    (event: ImageErrorEventData) => {
      onError?.(event);

      if (fallbackSource && !useFallbackSource) {
        setUseFallbackSource(true);
        setIsLoading(true);

        return;
      }

      setHasError(true);
      setIsLoading(false);
    },
    [fallbackSource, onError, useFallbackSource],
  );

  const resolvedContainerStyleObject = useMemo<ViewStyle>(
    () => ({
      backgroundColor: colors.surfaceSecondary,
      borderRadius: resolveRadiusValue(radius, radiusScale),
      overflow: 'hidden',
    }),
    [colors.surfaceSecondary, radius, radiusScale],
  );

  const resolvedImageStyleObject = useMemo<ImageStyle>(
    () => ({
      ...StyleSheet.absoluteFillObject,
      borderRadius: resolveRadiusValue(radius, radiusScale),
      tintColor: resolveColorToken(tintColorToken, colors),
    }),
    [colors, radius, radiusScale, tintColorToken],
  );

  const dynamicStyles = useMemo(
    () =>
      createDynamicStyles(
        resolvedContainerStyleObject,
        resolvedImageStyleObject,
        {
          backgroundColor: hasError ? colors.overlay : colors.transparent,
          borderRadius: resolveRadiusValue(radius, radiusScale),
          padding: spacing.md,
        },
      ),
    [
      colors,
      hasError,
      radius,
      radiusScale,
      resolvedContainerStyleObject,
      resolvedImageStyleObject,
      spacing.md,
    ],
  );

  const resolvedContainerStyle = useMemo(
    () => [dynamicStyles.container, style],
    [dynamicStyles.container, style],
  );

  const resolvedImageStyle = useMemo(
    () => [dynamicStyles.image, imageStyle],
    [dynamicStyles.image, imageStyle],
  );

  const resolvedSource = useMemo(
    () => (useFallbackSource ? fallbackSource ?? source : source),
    [fallbackSource, source, useFallbackSource],
  );

  const resolvedTransition = transitionDuration ?? animation.duration.normal;

  return (
    <AppImageView
      accessibilityLabel={
        accessibilityLabel ?? APP_STRINGS.components.image.accessibilityLabel
      }
      errorLabel={APP_STRINGS.components.image.errorLabel}
      handleError={handleError}
      handleLoad={handleLoad}
      handleLoadEnd={handleLoadEnd}
      handleLoadStart={handleLoadStart}
      handleProgress={handleProgress}
      hasError={hasError}
      isLoading={isLoading}
      loadingColor={colors.primary}
      loadingLabel={APP_STRINGS.components.image.loadingLabel}
      resolvedContainerStyle={resolvedContainerStyle}
      resolvedImageStyle={resolvedImageStyle}
      resolvedPlaceholderSource={placeholderSource}
      resolvedSource={resolvedSource}
      resolvedTransition={resolvedTransition}
      transitionDuration={transitionDuration}
      {...restProps}
    />
  );
};

AppImageContainerComponent.displayName = 'AppImage';

export const AppImage = memo(AppImageContainerComponent);
