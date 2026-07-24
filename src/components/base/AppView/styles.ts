/**
 * Styles for the AppView foundation component.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});

export const createDynamicStyles = (container: ViewStyle) =>
  StyleSheet.create({
    container,
  });
