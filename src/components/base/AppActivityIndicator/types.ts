/**
 * Public props for the AppActivityIndicator foundation component.
 */

import type { ActivityIndicatorProps, StyleProp, ViewStyle } from 'react-native';

import type { ThemeColorToken } from '../shared';

export interface AppActivityIndicatorProps
  extends Omit<ActivityIndicatorProps, 'color' | 'style'> {
  colorToken?: ThemeColorToken;
  style?: StyleProp<ViewStyle>;
}

export interface AppActivityIndicatorViewProps
  extends Omit<AppActivityIndicatorProps, 'style'> {
  resolvedColor: string;
  resolvedStyle?: StyleProp<ViewStyle>;
}
