/**
 * Public props for the Divider layout primitive.
 */

import type { StyleProp, ViewStyle } from 'react-native';

import type { AppViewProps } from '../../base';

export interface DividerProps extends Omit<AppViewProps, 'style'> {
  inset?: number | string;
  orientation?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  thickness?: number;
}

export interface DividerViewProps extends DividerProps {
  resolvedStyle: StyleProp<ViewStyle>;
}
