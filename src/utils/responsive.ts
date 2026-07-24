/**
 * Window-size based helpers for responsive sizing across device classes.
 */

import { Dimensions, PixelRatio } from 'react-native';

const BASE_SCREEN_WIDTH = 375;
const BASE_SCREEN_HEIGHT = 812;
const MODERATE_SCALE_FACTOR = 0.5;

const getWindowDimensions = () => Dimensions.get('window');

export const screenWidth = getWindowDimensions().width;
export const screenHeight = getWindowDimensions().height;

export const scale = (size: number): number => {
  const currentWidth = getWindowDimensions().width;
  const widthScale = currentWidth / BASE_SCREEN_WIDTH;

  return PixelRatio.roundToNearestPixel(size * widthScale);
};

export const verticalScale = (size: number): number => {
  const currentHeight = getWindowDimensions().height;
  const heightScale = currentHeight / BASE_SCREEN_HEIGHT;

  return PixelRatio.roundToNearestPixel(size * heightScale);
};

export const moderateScale = (
  size: number,
  factor: number = MODERATE_SCALE_FACTOR,
): number => {
  return size + (scale(size) - size) * factor;
};
