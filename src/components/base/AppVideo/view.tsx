import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { VideoView } from 'expo-video';

import { AppImage } from '../AppImage';
import { AppText } from '../AppText';

import { styles } from './styles';
import type { AppVideoViewProps } from './types';

const AppVideoViewComponent = ({
  controls = true,
  errorLabel,
  handleFirstFrameRender,
  hasError,
  isLoading,
  loadingColor,
  loadingLabel,
  player,
  posterSource,
  resolvedContainerStyle,
  resolvedContentFit,
  resolvedVideoStyle,
  showErrorState = true,
  showLoadingState = true,
  showPoster,
  showPosterOnError = true,
  ...restProps
}: AppVideoViewProps) => {
  return (
    <View style={resolvedContainerStyle}>
      <VideoView
        {...restProps}
        contentFit={resolvedContentFit}
        nativeControls={controls}
        onFirstFrameRender={handleFirstFrameRender}
        player={player}
        style={resolvedVideoStyle}
      />
      {showPoster && posterSource ? (
        <AppImage
          accessible={false}
          imageStyle={styles.absoluteFill}
          showErrorState={false}
          showLoadingState={false}
          source={posterSource}
          style={styles.absoluteFill}
        />
      ) : null}
      {showLoadingState && isLoading && !hasError ? (
        <View
          accessible
          accessibilityLabel={loadingLabel}
          pointerEvents="none"
          style={[styles.absoluteFill, styles.centerContent]}
        >
          <ActivityIndicator color={loadingColor} />
        </View>
      ) : null}
      {showErrorState && hasError && (!posterSource || showPosterOnError) ? (
        <View
          pointerEvents="none"
          style={[styles.absoluteFill, styles.centerContent]}
        >
          <AppText align="center" colorToken="textInverse" variant="caption">
            {errorLabel}
          </AppText>
        </View>
      ) : null}
    </View>
  );
};

AppVideoViewComponent.displayName = 'AppVideoView';

export const AppVideoView = memo(AppVideoViewComponent);
