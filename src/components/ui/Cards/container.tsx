import React, { memo, useMemo } from 'react';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';

import type {
  CategoryCardProps,
  ContinueWatchingCardProps,
  DownloadCardProps,
  EpisodeCardProps,
  HeroCardProps,
  MovieCardProps,
  ProfileCardProps,
  SearchCardProps,
  SettingsCardProps,
} from './types';
import { createDynamicStyles } from './styles';
import {
  CategoryCardView,
  ContinueWatchingCardView,
  DownloadCardView,
  EpisodeCardView,
  HeroCardView,
  MovieCardView,
  ProfileCardView,
  SearchCardView,
  SettingsCardView,
} from './view';

const MovieCardComponent = (props: MovieCardProps) => <MovieCardView {...props} />;
MovieCardComponent.displayName = 'MovieCard';

const HeroCardComponent = (props: HeroCardProps) => {
  const dynamicStyles = useMemo(
    () =>
      createDynamicStyles(
        moderateScale(COMPONENT_DEFAULTS.media.heroMinHeight),
      ),
    [],
  );

  return <HeroCardView heroStyle={dynamicStyles.heroSurface} {...props} />;
};
HeroCardComponent.displayName = 'HeroCard';

const EpisodeCardComponent = (props: EpisodeCardProps) => <EpisodeCardView {...props} />;
EpisodeCardComponent.displayName = 'EpisodeCard';

const ContinueWatchingCardComponent = (props: ContinueWatchingCardProps) => (
  <ContinueWatchingCardView {...props} />
);
ContinueWatchingCardComponent.displayName = 'ContinueWatchingCard';

const DownloadCardComponent = (props: DownloadCardProps) => <DownloadCardView {...props} />;
DownloadCardComponent.displayName = 'DownloadCard';

const ProfileCardComponent = (props: ProfileCardProps) => <ProfileCardView {...props} />;
ProfileCardComponent.displayName = 'ProfileCard';

const SettingsCardComponent = (props: SettingsCardProps) => <SettingsCardView {...props} />;
SettingsCardComponent.displayName = 'SettingsCard';

const SearchCardComponent = (props: SearchCardProps) => <SearchCardView {...props} />;
SearchCardComponent.displayName = 'SearchCard';

const CategoryCardComponent = (props: CategoryCardProps) => <CategoryCardView {...props} />;
CategoryCardComponent.displayName = 'CategoryCard';

export const MovieCard = memo(MovieCardComponent);
export const HeroCard = memo(HeroCardComponent);
export const EpisodeCard = memo(EpisodeCardComponent);
export const ContinueWatchingCard = memo(ContinueWatchingCardComponent);
export const DownloadCard = memo(DownloadCardComponent);
export const ProfileCard = memo(ProfileCardComponent);
export const SettingsCard = memo(SettingsCardComponent);
export const SearchCard = memo(SearchCardComponent);
export const CategoryCard = memo(CategoryCardComponent);
