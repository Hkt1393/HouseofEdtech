import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

import { AppText } from '../AppText';

import { createDynamicStyles, styles } from './styles';
import type { AppImageViewProps } from './types';

const AppImageViewComponent = ({
  errorLabel,
  handleError,
  handleLoad,
  handleLoadEnd,
  handleLoadStart,
  handleProgress,
  hasError,
  isLoading,
  loadingColor,
  loadingLabel,
  resolvedContainerStyle,
  resolvedImageStyle,
  resolvedPlaceholderSource,
  resolvedSource,
  resolvedTransition,
  showErrorState = true,
  showLoadingState = true,
  transitionDuration,
  ...restProps
}: AppImageViewProps) => {
  const dynamicStyles = createDynamicStyles(
    {},
    {},
    {},
  );

  return (
    <View style={resolvedContainerStyle}>
      <ExpoImage
        {...restProps}
        onError={handleError}
        onLoad={handleLoad}
        onLoadEnd={handleLoadEnd}
        onLoadStart={handleLoadStart}
        onProgress={handleProgress}
        placeholder={resolvedPlaceholderSource}
        source={resolvedSource}
        style={resolvedImageStyle}
        transition={transitionDuration ?? resolvedTransition}
      />
      {showLoadingState && isLoading && !hasError ? (
        <View
          accessible
          accessibilityLabel={loadingLabel}
          pointerEvents="none"
          style={[styles.absoluteFill, styles.centerContent, dynamicStyles.overlay]}
        >
          <ActivityIndicator color={loadingColor} />
        </View>
      ) : null}
      {showErrorState && hasError ? (
        <View
          pointerEvents="none"
          style={[styles.absoluteFill, styles.centerContent, dynamicStyles.overlay]}
        >
          <AppText align="center" colorToken="textInverse" variant="caption">
            {errorLabel}
          </AppText>
        </View>
      ) : null}
    </View>
  );
};

AppImageViewComponent.displayName = 'AppImageView';

export const AppImageView = memo(AppImageViewComponent);
