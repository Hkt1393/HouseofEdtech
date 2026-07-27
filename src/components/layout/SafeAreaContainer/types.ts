/**
 * Public props for the SafeAreaContainer layout primitive.
 */

import type { StyleProp, ViewStyle } from 'react-native';

import type { AppViewProps } from '../../base';

import type { SafeAreaEdge } from '../shared';

export interface SafeAreaContainerProps extends Omit<AppViewProps, 'style'> {
  edges?: ReadonlyArray<SafeAreaEdge>;
  mode?: 'padding' | 'margin';
  style?: StyleProp<ViewStyle>;
}

export interface SafeAreaContainerViewProps extends SafeAreaContainerProps {
  resolvedStyle: StyleProp<ViewStyle>;
}
