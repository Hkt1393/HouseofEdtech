/**
 * Public props for the AppFlatList foundation component.
 */

import type { ReactElement } from 'react';
import type {
  FlatListProps,
  RefreshControlProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import type { ThemeColorToken, ThemeSpacingValue } from '../shared';

export interface AppFlatListProps<ItemT>
  extends Omit<FlatListProps<ItemT>, 'contentContainerStyle' | 'refreshControl' | 'style'> {
  backgroundColorToken?: ThemeColorToken;
  contentContainerStyle?: StyleProp<ViewStyle>;
  contentGap?: ThemeSpacingValue;
  contentPadding?: ThemeSpacingValue;
  contentPaddingHorizontal?: ThemeSpacingValue;
  contentPaddingVertical?: ThemeSpacingValue;
  refreshControl?: ReactElement<RefreshControlProps>;
  refreshTintColorToken?: ThemeColorToken;
  style?: StyleProp<ViewStyle>;
}

export interface AppFlatListViewProps<ItemT>
  extends Omit<AppFlatListProps<ItemT>, 'contentContainerStyle' | 'refreshControl' | 'style'> {
  resolvedContentContainerStyle: StyleProp<ViewStyle>;
  resolvedKeyExtractor: NonNullable<FlatListProps<ItemT>['keyExtractor']>;
  resolvedRefreshControl?: ReactElement<RefreshControlProps>;
  resolvedStyle: StyleProp<ViewStyle>;
}
