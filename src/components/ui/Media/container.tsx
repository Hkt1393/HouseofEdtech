import React, { memo, useMemo } from 'react';

import { StatItem } from '../ContentPrimitives';

import type {
  AgeRatingBadgeProps,
  MovieInfoProps,
  MovieMetadataProps,
  MoviePosterProps,
  MovieProgressProps,
  MovieRatingProps,
  MovieRuntimeProps,
  MovieStatisticsProps,
  MovieThumbnailProps,
  QualityBadgeProps,
  WatchProgressProps,
} from './types';
import {
  AgeRatingBadgeView,
  MovieInfoView,
  MovieMetadataView,
  MoviePosterView,
  MovieProgressView,
  MovieRatingView,
  MovieRuntimeView,
  MovieStatisticsView,
  MovieThumbnailView,
  QualityBadgeView,
} from './view';

const MoviePosterComponent = (props: MoviePosterProps) => <MoviePosterView {...props} />;

MoviePosterComponent.displayName = 'MoviePoster';

const MovieThumbnailComponent = (props: MovieThumbnailProps) => <MovieThumbnailView {...props} />;

MovieThumbnailComponent.displayName = 'MovieThumbnail';

const MovieRuntimeComponent = (props: MovieRuntimeProps) => <MovieRuntimeView {...props} />;

MovieRuntimeComponent.displayName = 'MovieRuntime';

const MovieRatingComponent = (props: MovieRatingProps) => <MovieRatingView {...props} />;

MovieRatingComponent.displayName = 'MovieRating';

const MovieProgressComponent = (props: MovieProgressProps) => <MovieProgressView {...props} />;

MovieProgressComponent.displayName = 'MovieProgress';

const WatchProgressComponent = (props: WatchProgressProps) => <MovieProgressView {...props} />;

WatchProgressComponent.displayName = 'WatchProgress';

const QualityBadgeComponent = (props: QualityBadgeProps) => <QualityBadgeView {...props} />;

QualityBadgeComponent.displayName = 'QualityBadge';

const AgeRatingBadgeComponent = (props: AgeRatingBadgeProps) => (
  <AgeRatingBadgeView {...props} />
);

AgeRatingBadgeComponent.displayName = 'AgeRatingBadge';

const MovieMetadataComponent = ({
  ageRatingLabel,
  extraItems,
  qualityLabel,
  ratingCaption,
  ratingValue,
  runtimeLabel,
  wrap,
}: MovieMetadataProps) => {
  const renderedMetadataItems = useMemo(() => {
    const items = [...(extraItems ?? [])];

    if (runtimeLabel) {
      items.unshift({
        id: 'runtime',
        label: runtimeLabel,
        tone: 'neutral' as const,
        variant: 'soft' as const,
      });
    }

    if (ratingValue !== undefined) {
      items.push({
        id: 'rating',
        label: ratingCaption ? `${ratingValue} ${ratingCaption}` : String(ratingValue),
        tone: 'warning' as const,
        variant: 'soft' as const,
      });
    }

    if (qualityLabel) {
      items.push({
        id: 'quality',
        label: qualityLabel,
        tone: 'info' as const,
        variant: 'outline' as const,
      });
    }

    if (ageRatingLabel) {
      items.push({
        id: 'age-rating',
        label: ageRatingLabel,
        tone: 'neutral' as const,
        variant: 'soft' as const,
      });
    }

    return items;
  }, [ageRatingLabel, extraItems, qualityLabel, ratingCaption, ratingValue, runtimeLabel]);

  return <MovieMetadataView renderedMetadataItems={renderedMetadataItems} wrap={wrap} />;
};

MovieMetadataComponent.displayName = 'MovieMetadata';

const MovieInfoComponent = (props: MovieInfoProps) => <MovieInfoView {...props} />;

MovieInfoComponent.displayName = 'MovieInfo';

const MovieStatisticsComponent = ({ items }: MovieStatisticsProps) => {
  const renderedItems = useMemo(
    () =>
      items.map((item) => (
        <StatItem
          description={item.description}
          key={item.label}
          label={item.label}
          value={item.value}
        />
      )),
    [items],
  );

  return <MovieStatisticsView renderedItems={renderedItems} />;
};

MovieStatisticsComponent.displayName = 'MovieStatistics';

export const MoviePoster = memo(MoviePosterComponent);
export const MovieThumbnail = memo(MovieThumbnailComponent);
export const MovieRuntime = memo(MovieRuntimeComponent);
export const MovieRating = memo(MovieRatingComponent);
export const MovieProgress = memo(MovieProgressComponent);
export const WatchProgress = memo(WatchProgressComponent);
export const QualityBadge = memo(QualityBadgeComponent);
export const AgeRatingBadge = memo(AgeRatingBadgeComponent);
export const MovieMetadata = memo(MovieMetadataComponent);
export const MovieInfo = memo(MovieInfoComponent);
export const MovieStatistics = memo(MovieStatisticsComponent);
