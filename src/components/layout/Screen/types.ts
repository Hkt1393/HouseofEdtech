/**
 * Public props for the Screen layout primitive.
 */

import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { AppScrollViewProps, AppViewProps } from '../../base';

import type { SafeAreaEdge } from '../shared';

export interface ScreenProps extends Omit<AppViewProps, 'style'> {
  contentContainerStyle?: StyleProp<ViewStyle>;
  footer?: ReactNode;
  safeAreaEdges?: ReadonlyArray<SafeAreaEdge>;
  scrollProps?: Partial<AppScrollViewProps>;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface ScreenViewProps extends ScreenProps {
  resolvedContentContainerStyle: StyleProp<ViewStyle>;
  resolvedStyle: StyleProp<ViewStyle>;
}
