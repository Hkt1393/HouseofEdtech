/**
 * Styles for the AppImage foundation component.
 */

import { StyleSheet, type ImageStyle, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const createDynamicStyles = (
  container: ViewStyle,
  image: ImageStyle,
  overlay: ViewStyle,
) =>
  StyleSheet.create({
    container,
    image,
    overlay,
  });
