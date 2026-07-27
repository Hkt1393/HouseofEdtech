/**
 * Styles for the AppVideo foundation component.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

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
  video: ViewStyle,
  overlay: ViewStyle,
) =>
  StyleSheet.create({
    container,
    overlay,
    video,
  });
