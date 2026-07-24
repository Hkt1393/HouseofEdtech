/**
 * Styles for the AppFlatList foundation component.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  list: {},
});

export const createDynamicStyles = (
  list: ViewStyle,
  contentContainer: ViewStyle,
) =>
  StyleSheet.create({
    contentContainer,
    list,
  });
