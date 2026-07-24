/**
 * Public props for the Container layout primitive.
 */

import type { StyleProp, ViewStyle } from 'react-native';

import type { AppViewProps } from '../../base';

export interface ContainerProps extends Omit<AppViewProps, 'style'> {
  maxWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export interface ContainerViewProps extends ContainerProps {
  resolvedStyle: StyleProp<ViewStyle>;
}
