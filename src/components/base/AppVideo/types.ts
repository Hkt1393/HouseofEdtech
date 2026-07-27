/**
 * Public props for the AppVideo foundation component.
 */

import type {
  PlayerError,
  VideoContentFit,
  VideoPlayer,
  VideoPlayerStatus,
  VideoSource,
  VideoViewProps,
} from 'expo-video';
import type { StyleProp, ViewStyle } from 'react-native';

import type { AppImageSource } from '../AppImage';
import type { ThemeRadiusValue } from '../shared';

export interface AppVideoStatusChangeEvent {
  error?: PlayerError;
  status: VideoPlayerStatus;
}

export interface AppVideoProps
  extends Omit<VideoViewProps, 'contentFit' | 'nativeControls' | 'player' | 'style'> {
  autoPlay?: boolean;
  contentFit?: VideoContentFit;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  onError?: (error: PlayerError | null) => void;
  onReadyToPlay?: () => void;
  onStatusChange?: (event: AppVideoStatusChangeEvent) => void;
  posterSource?: AppImageSource;
  radius?: ThemeRadiusValue;
  resizeMode?: VideoContentFit;
  showErrorState?: boolean;
  showLoadingState?: boolean;
  showPosterOnError?: boolean;
  source: VideoSource;
  style?: StyleProp<ViewStyle>;
  videoStyle?: StyleProp<ViewStyle>;
}

export interface AppVideoViewProps
  extends Omit<
    AppVideoProps,
    'contentFit' | 'radius' | 'resizeMode' | 'source' | 'style' | 'videoStyle'
  > {
  errorLabel: string;
  handleFirstFrameRender: () => void;
  hasError: boolean;
  isLoading: boolean;
  loadingColor: string;
  loadingLabel: string;
  player: VideoPlayer;
  resolvedContainerStyle: StyleProp<ViewStyle>;
  resolvedContentFit: VideoContentFit;
  resolvedVideoStyle: StyleProp<ViewStyle>;
  showPoster: boolean;
}
