/**
 * Public props for feature-level carousel components.
 */

import type { ReactNode } from 'react';
import type { FlatListProps } from 'react-native';

import type { ThemeSpacingValue } from '../../base/shared';
import type {
  CategoryCardProps,
  ContinueWatchingCardProps,
  EpisodeCardProps,
  MovieCardProps,
  RecommendationCardProps,
} from '../Cards';

export interface CarouselLayoutProps {
  contentPaddingHorizontal?: ThemeSpacingValue;
  emptyState?: ReactNode;
  itemGap?: ThemeSpacingValue;
  itemWidth?: number;
  listFooterComponent?: ReactNode;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

export interface ContentCarouselProps<ItemT> extends CarouselLayoutProps {
  data: readonly ItemT[];
  keyExtractor?: (item: ItemT, index: number) => string;
  renderItem: (item: ItemT, index: number) => ReactNode;
}

export interface ContentCarouselViewProps<ItemT> extends CarouselLayoutProps {
  data: readonly ItemT[];
  keyExtractor?: (item: ItemT, index: number) => string;
  renderFlatListItem: NonNullable<FlatListProps<ItemT>['renderItem']>;
  resolvedGetItemLayout?: FlatListProps<ItemT>['getItemLayout'];
}

export interface MovieCarouselProps extends CarouselLayoutProps {
  movies: readonly MovieCardProps[];
  onMoviePress?: (item: MovieCardProps, index: number) => void;
}

export interface EpisodeCarouselProps extends CarouselLayoutProps {
  episodes: readonly EpisodeCardProps[];
  onEpisodePress?: (item: EpisodeCardProps, index: number) => void;
}

export interface ContinueWatchingCarouselProps extends CarouselLayoutProps {
  items: readonly ContinueWatchingCardProps[];
  onItemPress?: (item: ContinueWatchingCardProps, index: number) => void;
}

export interface RecommendationCarouselProps extends CarouselLayoutProps {
  items: readonly RecommendationCardProps[];
  onItemPress?: (item: RecommendationCardProps, index: number) => void;
}

export interface CategoryCarouselProps extends CarouselLayoutProps {
  categories: readonly CategoryCardProps[];
  onCategoryPress?: (item: CategoryCardProps, index: number) => void;
}
