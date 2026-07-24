/**
 * Styles for the AppTextInput foundation component.
 */

import {
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

export const styles = StyleSheet.create({
  characterCounterRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fieldInput: {
    flex: 1,
  },
  fieldRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
});

export const createDynamicStyles = (
  container: ViewStyle,
  inputContainer: ViewStyle,
  input: TextStyle,
  label: TextStyle,
  helperText: TextStyle,
  characterCounter: TextStyle,
) =>
  StyleSheet.create({
    characterCounter,
    container,
    helperText,
    input,
    inputContainer,
    label,
  });
