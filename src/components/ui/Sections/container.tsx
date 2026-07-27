import React, { memo } from 'react';

import type {
  CastSectionProps,
  CategorySectionProps,
  ContinueWatchingSectionProps,
  EpisodesSectionProps,
  FeaturedSectionProps,
  RecommendationSectionProps,
  RelatedSectionProps,
  SectionHeaderProps,
  TrendingSectionProps,
} from './types';
import {
  CastSectionView,
  CategorySectionView,
  ContinueWatchingSectionView,
  EpisodesSectionView,
  FeaturedSectionView,
  RecommendationSectionView,
  RelatedSectionView,
  SectionHeaderView,
  TrendingSectionView,
} from './view';

const SectionHeaderComponent = (props: SectionHeaderProps) => <SectionHeaderView {...props} />;
SectionHeaderComponent.displayName = 'SectionHeader';

const CategorySectionComponent = (props: CategorySectionProps) => (
  <CategorySectionView {...props} />
);
CategorySectionComponent.displayName = 'CategorySection';

const TrendingSectionComponent = (props: TrendingSectionProps) => (
  <TrendingSectionView {...props} />
);
TrendingSectionComponent.displayName = 'TrendingSection';

const FeaturedSectionComponent = (props: FeaturedSectionProps) => (
  <FeaturedSectionView {...props} />
);
FeaturedSectionComponent.displayName = 'FeaturedSection';

const ContinueWatchingSectionComponent = (props: ContinueWatchingSectionProps) => (
  <ContinueWatchingSectionView {...props} />
);
ContinueWatchingSectionComponent.displayName = 'ContinueWatchingSection';

const RecommendationSectionComponent = (props: RecommendationSectionProps) => (
  <RecommendationSectionView {...props} />
);
RecommendationSectionComponent.displayName = 'RecommendationSection';

const EpisodesSectionComponent = (props: EpisodesSectionProps) => (
  <EpisodesSectionView {...props} />
);
EpisodesSectionComponent.displayName = 'EpisodesSection';

const CastSectionComponent = (props: CastSectionProps) => <CastSectionView {...props} />;
CastSectionComponent.displayName = 'CastSection';

const RelatedSectionComponent = (props: RelatedSectionProps) => (
  <RelatedSectionView {...props} />
);
RelatedSectionComponent.displayName = 'RelatedSection';

export const SectionHeader = memo(SectionHeaderComponent);
export const CategorySection = memo(CategorySectionComponent);
export const TrendingSection = memo(TrendingSectionComponent);
export const FeaturedSection = memo(FeaturedSectionComponent);
export const ContinueWatchingSection = memo(ContinueWatchingSectionComponent);
export const RecommendationSection = memo(RecommendationSectionComponent);
export const EpisodesSection = memo(EpisodesSectionComponent);
export const CastSection = memo(CastSectionComponent);
export const RelatedSection = memo(RelatedSectionComponent);
