/**
 * Styles for reusable modal components.
 */

import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  sheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export const createDynamicStyles = (sheetMaxWidth: number, dialogMaxWidth: number) =>
  StyleSheet.create({
    dialog: {
      maxWidth: dialogMaxWidth,
      width: '100%',
    } satisfies ViewStyle,
    sheet: {
      alignSelf: 'center',
      maxWidth: sheetMaxWidth,
      width: '100%',
    } satisfies ViewStyle,
  });
