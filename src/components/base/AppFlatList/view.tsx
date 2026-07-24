import React, { forwardRef, memo } from 'react';
import { FlatList } from 'react-native';

import type { AppFlatListViewProps } from './types';

const AppFlatListViewInner = <ItemT,>(
  {
    resolvedContentContainerStyle,
    resolvedKeyExtractor,
    resolvedRefreshControl,
    resolvedStyle,
    ...restProps
  }: AppFlatListViewProps<ItemT>,
  ref: React.ForwardedRef<FlatList<ItemT>>,
) => {
  return (
    <FlatList
      {...restProps}
      contentContainerStyle={resolvedContentContainerStyle}
      keyExtractor={resolvedKeyExtractor}
      refreshControl={resolvedRefreshControl}
      ref={ref}
      style={resolvedStyle}
    />
  );
};

const AppFlatListViewBase = forwardRef(AppFlatListViewInner);

AppFlatListViewBase.displayName = 'AppFlatListView';

const AppFlatListViewComponent = AppFlatListViewBase as <ItemT>(
  props: AppFlatListViewProps<ItemT> & {
    ref?: React.ForwardedRef<FlatList<ItemT>>;
  },
) => React.ReactElement | null;

export const AppFlatListView = memo(
  AppFlatListViewComponent,
) as typeof AppFlatListViewComponent;
