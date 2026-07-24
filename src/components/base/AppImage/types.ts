/**
 * Public props for the AppImage foundation component.
 */

import type {
  ImageContentFit,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageProgressEventData,
  ImageProps as ExpoImageProps,
  ImageStyle as ExpoImageStyle,
} from 'expo-image';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemeColorToken, ThemeRadiusValue } from '../shared';

export type AppImageSource = ExpoImageProps['source'];
export type AppImagePlaceholderSource = ExpoImageProps['placeholder'];

export interface AppImageProps
  extends Omit<ExpoImageProps, 'placeholder' | 'source' | 'style' | 'transition'> {
  fallbackSource?: AppImageSource;
  imageStyle?: StyleProp<ExpoImageStyle>;
  placeholderSource?: AppImagePlaceholderSource;
  radius?: ThemeRadiusValue;
  showErrorState?: boolean;
  showLoadingState?: boolean;
  source?: AppImageSource;
  style?: StyleProp<ViewStyle>;
  tintColorToken?: ThemeColorToken;
  transitionDuration?: number;
}

export interface AppImageViewProps
  extends Omit<
    AppImageProps,
    'fallbackSource' | 'imageStyle' | 'placeholderSource' | 'radius' | 'style'
  > {
  errorLabel: string;
  handleError: (event: ImageErrorEventData) => void;
  handleLoad: (event: ImageLoadEventData) => void;
  handleLoadEnd: () => void;
  handleLoadStart: () => void;
  handleProgress?: (event: ImageProgressEventData) => void;
  hasError: boolean;
  isLoading: boolean;
  loadingColor: string;
  loadingLabel: string;
  resolvedContainerStyle: StyleProp<ViewStyle>;
  resolvedImageStyle: StyleProp<ExpoImageStyle>;
  resolvedPlaceholderSource?: AppImagePlaceholderSource;
  resolvedSource?: AppImageSource;
  resolvedTransition: number;
}
