/**
 * Public props for the AbsoluteFill layout primitive.
 */

import type { StyleProp, ViewStyle } from 'react-native';

import type { AppViewProps } from '../../base';

export interface AbsoluteFillProps extends Omit<AppViewProps, 'style'> {
  style?: StyleProp<ViewStyle>;
}

export interface AbsoluteFillViewProps extends AbsoluteFillProps {
  resolvedStyle: StyleProp<ViewStyle>;
}
