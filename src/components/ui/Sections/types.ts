/**
 * Public props for feature-level section components.
 */

import type { ReactNode } from 'react';

import type {
  FeaturedMovieCardProps,
} from '../Cards';
import type {
  CategoryCarouselProps,
  ContinueWatchingCarouselProps,
  EpisodeCarouselProps,
  MovieCarouselProps,
  RecommendationCarouselProps,
} from '../Carousels';

export interface SectionHeaderProps {
  actionLabel?: string;
  headerAccessory?: ReactNode;
  onActionPress?: () => void;
  subtitle?: string;
  title: string;
}

export interface CategorySectionProps extends SectionHeaderProps, CategoryCarouselProps {}

export interface TrendingSectionProps extends SectionHeaderProps, MovieCarouselProps {}

export interface FeaturedSectionProps extends SectionHeaderProps {
  items: readonly FeaturedMovieCardProps[];
  onItemPress?: (item: FeaturedMovieCardProps, index: number) => void;
}

export interface ContinueWatchingSectionProps
  extends SectionHeaderProps,
    ContinueWatchingCarouselProps {}

export interface RecommendationSectionProps
  extends SectionHeaderProps,
    RecommendationCarouselProps {}

export interface EpisodesSectionProps extends SectionHeaderProps, EpisodeCarouselProps {}

export interface CastMember {
  avatarLabel?: string;
  id: string;
  imageUrl?: string | null;
  name: string;
  onPress?: () => void;
  subtitle?: string;
}

export interface CastSectionProps extends SectionHeaderProps {
  members: readonly CastMember[];
  onMemberPress?: (member: CastMember, index: number) => void;
}

export interface RelatedSectionProps extends RecommendationSectionProps {}
