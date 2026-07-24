/**
 * Public props for the AppScrollView foundation component.
 */

import type { ReactElement } from 'react';
import type {
  RefreshControlProps,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import type { ThemeColorToken, ThemeSpacingValue } from '../shared';

export interface AppScrollViewProps
  extends Omit<
    ScrollViewProps,
    'contentContainerStyle' | 'refreshControl' | 'style'
  > {
  backgroundColorToken?: ThemeColorToken;
  contentContainerStyle?: StyleProp<ViewStyle>;
  contentGap?: ThemeSpacingValue;
  contentPadding?: ThemeSpacingValue;
  contentPaddingHorizontal?: ThemeSpacingValue;
  contentPaddingVertical?: ThemeSpacingValue;
  onRefresh?: () => void;
  refreshControl?: ReactElement<RefreshControlProps>;
  refreshTintColorToken?: ThemeColorToken;
  refreshing?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface AppScrollViewViewProps
  extends Omit<
    AppScrollViewProps,
    'contentContainerStyle' | 'refreshControl' | 'style'
  > {
  resolvedContentContainerStyle: StyleProp<ViewStyle>;
  resolvedRefreshControl?: ReactElement<RefreshControlProps>;
  resolvedStyle: StyleProp<ViewStyle>;
}
