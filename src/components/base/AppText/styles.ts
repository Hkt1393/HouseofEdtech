/**
 * Styles for the AppText foundation component.
 */

import { StyleSheet, type TextStyle } from 'react-native';

export const styles = StyleSheet.create({
  text: {},
});

export const createDynamicStyles = (text: TextStyle) =>
  StyleSheet.create({
    text,
  });
