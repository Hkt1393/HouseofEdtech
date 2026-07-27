/**
 * Public props for the AppText foundation component.
 */

import type { ReactNode } from 'react';
import type { StyleProp, TextProps, TextStyle } from 'react-native';

import type {
  AppTextVariant,
  ThemeColorToken,
  ThemeFontWeightToken,
} from '../shared';

export interface AppTextProps extends Omit<TextProps, 'style'> {
  align?: TextStyle['textAlign'];
  children?: ReactNode;
  colorToken?: ThemeColorToken;
  style?: StyleProp<TextStyle>;
  variant?: AppTextVariant;
  weight?: ThemeFontWeightToken;
}

export interface AppTextViewProps extends Omit<AppTextProps, 'style'> {
  resolvedStyle: StyleProp<TextStyle>;
}
