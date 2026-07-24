/**
 * Styles for reusable skeleton placeholders.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  grow: {
    flex: 1,
  },
});

export const createBannerStyles = (height: number) =>
  StyleSheet.create({
    media: {
      height,
      width: '100%',
    } satisfies ViewStyle,
  });
