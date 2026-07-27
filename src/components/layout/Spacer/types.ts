/**
 * Public props for the Spacer layout primitive.
 */

import type { StyleProp, ViewStyle } from 'react-native';

import type { AppViewProps } from '../../base';
import type { ThemeSpacingValue } from '../../base/shared';

export interface SpacerProps extends Omit<AppViewProps, 'children' | 'style'> {
  size?: ThemeSpacingValue;
  style?: StyleProp<ViewStyle>;
}

export interface SpacerViewProps extends SpacerProps {
  resolvedStyle: StyleProp<ViewStyle>;
}
