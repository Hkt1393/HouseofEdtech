/**
 * Device and platform helpers backed by React Native core APIs.
 */

import { Dimensions, Platform } from 'react-native';

import type {
  DeviceOrientation,
  NativePlatform,
  SafeAreaInsetsLike,
} from '../types';

const TABLET_MIN_DIMENSION = 768;

const getWindowDimensions = () => Dimensions.get('window');

const resolvePlatform = (): NativePlatform => {
  switch (Platform.OS) {
    case 'android':
      return 'android';
    case 'ios':
      return 'ios';
    default:
      return 'web';
  }
};

export const platform = resolvePlatform();
export const isAndroid = platform === 'android';
export const isIOS = platform === 'ios';
export const isWeb = platform === 'web';

export const getOrientation = (): DeviceOrientation => {
  const { width, height } = getWindowDimensions();

  return height >= width ? 'portrait' : 'landscape';
};

export const isPortrait = (): boolean => getOrientation() === 'portrait';
export const isLandscape = (): boolean => getOrientation() === 'landscape';

export const isTablet = (): boolean => {
  const { width, height } = getWindowDimensions();
  const smallestDimension = Math.min(width, height);

  return smallestDimension >= TABLET_MIN_DIMENSION;
};

export const defaultSafeAreaInsets: SafeAreaInsetsLike = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const getSafeAreaInsetsFallback = (): SafeAreaInsetsLike => {
  return defaultSafeAreaInsets;
};
