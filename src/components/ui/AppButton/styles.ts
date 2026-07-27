/**
 * Styles for the button component family.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  fullWidth: {
    alignSelf: 'stretch',
  },
});

export const createDynamicStyles = (
  minHeight: number,
  minWidth: number,
): { surface: ViewStyle } =>
  StyleSheet.create({
    surface: {
      minHeight,
      minWidth,
    },
  });
