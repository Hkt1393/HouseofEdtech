/**
 * Styles for the AppScrollView foundation component.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {},
});

export const createDynamicStyles = (
  scrollView: ViewStyle,
  contentContainer: ViewStyle,
) =>
  StyleSheet.create({
    contentContainer,
    scrollView,
  });
