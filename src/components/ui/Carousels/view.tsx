import React, { forwardRef, memo } from 'react';
import type { FlatList } from 'react-native';

import { AppFlatList } from '../../base';

import { styles } from './styles';
import type { ContentCarouselViewProps } from './types';

const ContentCarouselViewInner = <ItemT,>(
  {
    contentPaddingHorizontal = 'md',
    data,
    emptyState,
    itemGap = 'md',
    keyExtractor,
    listFooterComponent,
    onEndReached,
    onEndReachedThreshold,
    renderFlatListItem,
    resolvedGetItemLayout,
  }: ContentCarouselViewProps<ItemT>,
  ref: React.ForwardedRef<FlatList<ItemT>>,
) => {
  return (
    <AppFlatList
      ListFooterComponent={listFooterComponent ? <>{listFooterComponent}</> : undefined}
      ListEmptyComponent={emptyState ? <>{emptyState}</> : undefined}
      contentGap={itemGap}
      contentPaddingHorizontal={contentPaddingHorizontal}
      data={data}
      getItemLayout={resolvedGetItemLayout}
      horizontal
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ref={ref}
      renderItem={renderFlatListItem}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
    />
  );
};

const ContentCarouselViewBase = forwardRef(ContentCarouselViewInner);

ContentCarouselViewBase.displayName = 'ContentCarouselView';

const ContentCarouselViewComponent = ContentCarouselViewBase as <ItemT>(
  props: ContentCarouselViewProps<ItemT> & {
    ref?: React.ForwardedRef<FlatList<ItemT>>;
  },
) => React.ReactElement | null;

export const ContentCarouselView = memo(
  ContentCarouselViewComponent,
) as typeof ContentCarouselViewComponent;
