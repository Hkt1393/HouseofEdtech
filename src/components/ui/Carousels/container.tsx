import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import type { FlatList, FlatListProps } from 'react-native';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { useTheme } from '../../../theme';
import { moderateScale } from '../../../utils';

import { resolveSpacingValue } from '../../base/shared';
import {
  CategoryCard,
  type CategoryCardProps,
  ContinueWatchingCard,
  type ContinueWatchingCardProps,
  EpisodeCard,
  type EpisodeCardProps,
  MovieCard,
  type MovieCardProps,
  RecommendationCard,
  type RecommendationCardProps,
} from '../Cards';

import type {
  CategoryCarouselProps,
  ContentCarouselProps,
  ContinueWatchingCarouselProps,
  EpisodeCarouselProps,
  MovieCarouselProps,
  RecommendationCarouselProps,
} from './types';
import { ContentCarouselView } from './view';

const resolveCarouselItemKey = (
  item: {
    accessibilityLabel?: string;
    id?: string;
    title?: string;
  },
  fallbackPrefix: string,
): string => {
  return item.id ?? item.accessibilityLabel ?? item.title ?? fallbackPrefix;
};

const ContentCarouselInner = <ItemT,>(
  {
    contentPaddingHorizontal,
    data,
    emptyState,
    itemGap = 'md',
    itemWidth,
    keyExtractor,
    listFooterComponent,
    onEndReached,
    onEndReachedThreshold,
    renderItem,
  }: ContentCarouselProps<ItemT>,
  ref: React.ForwardedRef<FlatList<ItemT>>,
) => {
  const { spacing } = useTheme();

  const resolvedGap = useMemo(
    () => resolveSpacingValue(itemGap, spacing) ?? 0,
    [itemGap, spacing],
  );

  const renderFlatListItem = useCallback<
    NonNullable<FlatListProps<ItemT>['renderItem']>
  >(
    ({ index, item }) => <>{renderItem(item, index)}</>,
    [renderItem],
  );

  const resolvedGetItemLayout = useMemo<FlatListProps<ItemT>['getItemLayout']>(
    () => {
      if (!itemWidth) {
        return undefined;
      }

      const resolvedWidth = moderateScale(itemWidth);

      return (_data, index) => ({
        index,
        length: resolvedWidth + resolvedGap,
        offset: (resolvedWidth + resolvedGap) * index,
      });
    },
    [itemWidth, resolvedGap],
  );

  return (
    <ContentCarouselView
      contentPaddingHorizontal={contentPaddingHorizontal}
      data={data}
      emptyState={emptyState}
      itemGap={itemGap}
      keyExtractor={keyExtractor}
      listFooterComponent={listFooterComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ref={ref}
      renderFlatListItem={renderFlatListItem}
      resolvedGetItemLayout={resolvedGetItemLayout}
    />
  );
};

const ContentCarouselBase = forwardRef(ContentCarouselInner);

ContentCarouselBase.displayName = 'ContentCarousel';

const ContentCarouselComponent = ContentCarouselBase as <ItemT>(
  props: ContentCarouselProps<ItemT> & {
    ref?: React.ForwardedRef<FlatList<ItemT>>;
  },
) => React.ReactElement | null;

const MovieCarouselComponent = ({
  itemWidth = COMPONENT_DEFAULTS.media.posterWidth,
  movies,
  onMoviePress,
  ...restProps
}: MovieCarouselProps) => {
  const renderItem = useCallback(
    (item: MovieCardProps, index: number) => (
      <MovieCard
        {...item}
        onPress={item.onPress ?? (onMoviePress ? () => onMoviePress(item, index) : undefined)}
      />
    ),
    [onMoviePress],
  );

  return (
    <ContentCarousel
      data={movies}
      itemWidth={itemWidth}
      keyExtractor={(item) => resolveCarouselItemKey(item, 'movie-card')}
      renderItem={renderItem}
      {...restProps}
    />
  );
};

MovieCarouselComponent.displayName = 'MovieCarousel';

const EpisodeCarouselComponent = ({
  episodes,
  itemWidth = COMPONENT_DEFAULTS.media.thumbnailWidth,
  onEpisodePress,
  ...restProps
}: EpisodeCarouselProps) => {
  const renderItem = useCallback(
    (item: EpisodeCardProps, index: number) => (
      <EpisodeCard
        {...item}
        onPress={item.onPress ?? (onEpisodePress ? () => onEpisodePress(item, index) : undefined)}
      />
    ),
    [onEpisodePress],
  );

  return (
    <ContentCarousel
      data={episodes}
      itemWidth={itemWidth}
      keyExtractor={(item) => resolveCarouselItemKey(item, 'episode-card')}
      renderItem={renderItem}
      {...restProps}
    />
  );
};

EpisodeCarouselComponent.displayName = 'EpisodeCarousel';

const ContinueWatchingCarouselComponent = ({
  itemWidth = COMPONENT_DEFAULTS.media.thumbnailWidth,
  items,
  onItemPress,
  ...restProps
}: ContinueWatchingCarouselProps) => {
  const renderItem = useCallback(
    (item: ContinueWatchingCardProps, index: number) => (
      <ContinueWatchingCard
        {...item}
        onPress={item.onPress ?? (onItemPress ? () => onItemPress(item, index) : undefined)}
      />
    ),
    [onItemPress],
  );

  return (
    <ContentCarousel
      data={items}
      itemWidth={itemWidth}
      keyExtractor={(item) =>
        resolveCarouselItemKey(item, 'continue-watching-card')
      }
      renderItem={renderItem}
      {...restProps}
    />
  );
};

ContinueWatchingCarouselComponent.displayName = 'ContinueWatchingCarousel';

const RecommendationCarouselComponent = ({
  itemWidth = COMPONENT_DEFAULTS.media.thumbnailWidth,
  items,
  onItemPress,
  ...restProps
}: RecommendationCarouselProps) => {
  const renderItem = useCallback(
    (item: RecommendationCardProps, index: number) => (
      <RecommendationCard
        {...item}
        onPress={item.onPress ?? (onItemPress ? () => onItemPress(item, index) : undefined)}
      />
    ),
    [onItemPress],
  );

  return (
    <ContentCarousel
      data={items}
      itemWidth={itemWidth}
      keyExtractor={(item) => resolveCarouselItemKey(item, 'recommendation-card')}
      renderItem={renderItem}
      {...restProps}
    />
  );
};

RecommendationCarouselComponent.displayName = 'RecommendationCarousel';

const CategoryCarouselComponent = ({
  categories,
  itemWidth = COMPONENT_DEFAULTS.media.thumbnailWidth,
  onCategoryPress,
  ...restProps
}: CategoryCarouselProps) => {
  const renderItem = useCallback(
    (item: CategoryCardProps, index: number) => (
      <CategoryCard
        {...item}
        onPress={item.onPress ?? (onCategoryPress ? () => onCategoryPress(item, index) : undefined)}
      />
    ),
    [onCategoryPress],
  );

  return (
    <ContentCarousel
      data={categories}
      itemWidth={itemWidth}
      keyExtractor={(item) => resolveCarouselItemKey(item, 'category-card')}
      renderItem={renderItem}
      {...restProps}
    />
  );
};

CategoryCarouselComponent.displayName = 'CategoryCarousel';

export const ContentCarousel = memo(
  ContentCarouselComponent,
) as typeof ContentCarouselComponent;
export const MovieCarousel = memo(MovieCarouselComponent);
export const EpisodeCarousel = memo(EpisodeCarouselComponent);
export const ContinueWatchingCarousel = memo(ContinueWatchingCarouselComponent);
export const RecommendationCarousel = memo(RecommendationCarouselComponent);
export const CategoryCarousel = memo(CategoryCarouselComponent);
