/**
 * Styles for the Container layout primitive.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    width: '100%',
  },
});

export const createDynamicStyles = (style: ViewStyle) =>
  StyleSheet.create({
    root: style,
  });
