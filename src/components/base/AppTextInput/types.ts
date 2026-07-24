/**
 * Public props for the AppTextInput foundation component.
 */

import type { ReactNode } from 'react';
import type {
  BlurEvent,
  FocusEvent,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import type {
  ThemeColorToken,
  ThemeFontWeightToken,
} from '../shared';

export interface AppTextInputProps
  extends Omit<TextInputProps, 'placeholderTextColor' | 'style'> {
  containerStyle?: StyleProp<ViewStyle>;
  errorText?: string;
  helperText?: string;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  label?: string;
  labelColorToken?: ThemeColorToken;
  leadingIcon?: ReactNode;
  onTrailingActionPress?: () => void;
  placeholderColorToken?: ThemeColorToken;
  showCharacterCounter?: boolean;
  showSecureToggle?: boolean;
  textColorToken?: ThemeColorToken;
  trailingActionAccessibilityHint?: string;
  trailingActionAccessibilityLabel?: string;
  trailingIcon?: ReactNode;
  trailingIconPressable?: boolean;
  trailingTextWeight?: ThemeFontWeightToken;
}

export interface AppTextInputViewProps
  extends Omit<
    AppTextInputProps,
    'containerStyle' | 'inputContainerStyle' | 'inputStyle'
  > {
  currentValue: string;
  displayHelperText?: string;
  handleBlur: (event: BlurEvent) => void;
  handleChangeText: NonNullable<TextInputProps['onChangeText']>;
  handleFocus: (event: FocusEvent) => void;
  handleTrailingActionPress?: () => void;
  hasError: boolean;
  isFocused: boolean;
  isSecureEntryHidden: boolean;
  resolvedAccessibilityLabel: string;
  resolvedCharacterCounterStyle: StyleProp<TextStyle>;
  resolvedContainerStyle: StyleProp<ViewStyle>;
  resolvedHelperTextStyle: StyleProp<TextStyle>;
  resolvedInputContainerStyle: StyleProp<ViewStyle>;
  resolvedInputStyle: StyleProp<TextStyle>;
  resolvedLabelStyle: StyleProp<TextStyle>;
  resolvedPlaceholderTextColor: string;
  shouldShowCharacterCounter: boolean;
  shouldShowSecureToggle: boolean;
  trailingActionText: string;
}
