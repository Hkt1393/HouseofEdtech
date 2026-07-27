import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { type ViewStyle } from 'react-native';
import type { PlayerError, VideoPlayerStatus } from 'expo-video';
import { useVideoPlayer } from 'expo-video';

import { APP_STRINGS, COMPONENT_DEFAULTS } from '../../../constants';
import { useTheme } from '../../../theme';

import { resolveRadiusValue } from '../shared';

import { createDynamicStyles } from './styles';
import type { AppVideoProps, AppVideoStatusChangeEvent } from './types';
import { AppVideoView } from './view';

const AppVideoContainerComponent = ({
  accessibilityLabel,
  autoPlay = false,
  contentFit,
  controls = true,
  loop = false,
  muted = false,
  onError,
  onFirstFrameRender,
  onReadyToPlay,
  onStatusChange,
  posterSource,
  radius,
  resizeMode,
  showPosterOnError = true,
  source,
  style,
  videoStyle,
  ...restProps
}: AppVideoProps) => {
  const { colors, radius: radiusScale, spacing } = useTheme();
  const [hasError, setHasError] = useState(false);
  const [hasRenderedFirstFrame, setHasRenderedFirstFrame] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(source));

  const setupPlayer = useCallback(
    (player: ReturnType<typeof useVideoPlayer>) => {
      player.loop = loop;
      player.muted = muted;
      player.timeUpdateEventInterval =
        COMPONENT_DEFAULTS.video.timeUpdateEventIntervalSeconds;

      if (autoPlay) {
        player.play();
      }
    },
    [autoPlay, loop, muted],
  );

  const player = useVideoPlayer(source, setupPlayer);

  useEffect(() => {
    player.loop = loop;
    player.muted = muted;
    player.timeUpdateEventInterval =
      COMPONENT_DEFAULTS.video.timeUpdateEventIntervalSeconds;

    if (autoPlay) {
      player.play();
    } else {
      player.pause();
    }
  }, [autoPlay, loop, muted, player]);

  useEffect(() => {
    setHasError(false);
    setHasRenderedFirstFrame(false);
    setIsLoading(Boolean(source));
  }, [source]);

  useEffect(() => {
    const subscription = player.addListener('statusChange', (payload) => {
      const statusEvent: AppVideoStatusChangeEvent = {
        error: payload.error,
        status: payload.status,
      };

      const nextHasError = payload.status === 'error';

      setHasError(nextHasError);
      setIsLoading(payload.status === 'loading');

      if (payload.status === 'readyToPlay') {
        onReadyToPlay?.();
      }

      if (nextHasError) {
        onError?.(payload.error ?? null);
      }

      onStatusChange?.(statusEvent);
    });

    return () => {
      subscription.remove();
    };
  }, [onError, onReadyToPlay, onStatusChange, player]);

  const handleFirstFrameRender = useCallback(() => {
    setHasRenderedFirstFrame(true);
    setIsLoading(false);
    onFirstFrameRender?.();
  }, [onFirstFrameRender]);

  const resolvedContainerStyleObject = useMemo<ViewStyle>(
    () => ({
      backgroundColor: colors.surfaceSecondary,
      borderRadius: resolveRadiusValue(radius, radiusScale),
      overflow: 'hidden',
    }),
    [colors.surfaceSecondary, radius, radiusScale],
  );

  const resolvedVideoStyleObject = useMemo<ViewStyle>(
    () => ({
      borderRadius: resolveRadiusValue(radius, radiusScale),
      overflow: 'hidden',
    }),
    [radius, radiusScale],
  );

  const dynamicStyles = useMemo(
    () =>
      createDynamicStyles(
        resolvedContainerStyleObject,
        resolvedVideoStyleObject,
        {
          backgroundColor: hasError ? colors.overlay : colors.transparent,
          borderRadius: resolveRadiusValue(radius, radiusScale),
          padding: spacing.md,
        },
      ),
    [
      colors.overlay,
      colors.transparent,
      hasError,
      radius,
      radiusScale,
      resolvedContainerStyleObject,
      resolvedVideoStyleObject,
      spacing.md,
    ],
  );

  const resolvedContainerStyle = useMemo(
    () => [dynamicStyles.container, style],
    [dynamicStyles.container, style],
  );

  const resolvedVideoStyle = useMemo(
    () => [dynamicStyles.video, videoStyle],
    [dynamicStyles.video, videoStyle],
  );

  const resolvedContentFit = contentFit ?? resizeMode ?? 'contain';
  const showPoster =
    Boolean(posterSource) &&
    (!hasRenderedFirstFrame || isLoading || (showPosterOnError && hasError));

  return (
    <AppVideoView
      accessibilityLabel={
        accessibilityLabel ?? APP_STRINGS.components.video.accessibilityLabel
      }
      controls={controls}
      errorLabel={APP_STRINGS.components.video.errorLabel}
      handleFirstFrameRender={handleFirstFrameRender}
      hasError={hasError}
      isLoading={isLoading}
      loadingColor={colors.primary}
      loadingLabel={APP_STRINGS.components.video.loadingLabel}
      player={player}
      posterSource={posterSource}
      resolvedContainerStyle={resolvedContainerStyle}
      resolvedContentFit={resolvedContentFit}
      resolvedVideoStyle={resolvedVideoStyle}
      showPoster={showPoster}
      showPosterOnError={showPosterOnError}
      {...restProps}
    />
  );
};

AppVideoContainerComponent.displayName = 'AppVideo';

export const AppVideo = memo(AppVideoContainerComponent);
