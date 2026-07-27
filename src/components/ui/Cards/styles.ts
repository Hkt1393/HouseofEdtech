/**
 * Styles for reusable card components.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  grow: {
    flex: 1,
  },
});

export const createDynamicStyles = (heroMinHeight: number) =>
  StyleSheet.create({
    heroSurface: {
      minHeight: heroMinHeight,
      width: '100%',
    } satisfies ViewStyle,
  });
