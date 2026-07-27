/**
 * Styles for hero feature components.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
  },
  grow: {
    flex: 1,
  },
  hero: {
    overflow: 'hidden',
    width: '100%',
  },
  indicatorInactive: {
    opacity: 0.45,
  },
  indicatorRow: {
    width: '100%',
  },
  overlayBottom: {
    flex: 3,
  },
  overlayMiddle: {
    flex: 2,
  },
  overlayTop: {
    flex: 1,
  },
});

export const createDynamicStyles = (
  minHeight: number,
  activeIndicatorWidth: number,
  indicatorSize: number,
) =>
  StyleSheet.create({
    activeIndicator: {
      width: activeIndicatorWidth,
    } satisfies ViewStyle,
    hero: {
      minHeight,
    } satisfies ViewStyle,
    indicator: {
      height: indicatorSize,
      width: indicatorSize,
    } satisfies ViewStyle,
  });
