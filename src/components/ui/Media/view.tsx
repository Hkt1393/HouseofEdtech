import React, { memo } from 'react';

import { AppText, AppView } from '../../base';
import { Stack } from '../../layout';
import { Badge, InfoChip, Poster, ProgressBar, Rating, StatItem, Thumbnail } from '../ContentPrimitives';
import { GenreList, MetadataRow } from '../Shared';

import { styles } from './styles';
import type {
  AgeRatingBadgeProps,
  MovieInfoProps,
  MovieMetadataViewProps,
  MoviePosterProps,
  MovieProgressProps,
  MovieRatingProps,
  MovieRuntimeProps,
  MovieStatisticsViewProps,
  MovieThumbnailProps,
  QualityBadgeProps,
} from './types';

const MoviePosterViewComponent = ({
  accessibilityHint,
  accessibilityLabel,
  badgeLabel,
  metadataLabel,
  onPress,
  posterUrl,
  progress,
  title,
}: MoviePosterProps) => {
  return (
    <Poster
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? title}
      badgeLabel={badgeLabel}
      onPress={onPress}
      posterUrl={posterUrl}
      progress={progress}
      subtitle={metadataLabel}
      title={title}
    />
  );
};

MoviePosterViewComponent.displayName = 'MoviePosterView';

const MovieThumbnailViewComponent = ({
  accessibilityHint,
  accessibilityLabel,
  durationLabel,
  imageUrl,
  metadataLabel,
  onPress,
  title,
}: MovieThumbnailProps) => {
  return (
    <Thumbnail
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? title}
      durationLabel={durationLabel}
      imageUrl={imageUrl}
      onPress={onPress}
      subtitle={metadataLabel}
      title={title}
    />
  );
};

MovieThumbnailViewComponent.displayName = 'MovieThumbnailView';

const MovieRuntimeViewComponent = ({ icon, label, tone = 'neutral' }: MovieRuntimeProps) => {
  return <InfoChip icon={icon} label={label} tone={tone} />;
};

MovieRuntimeViewComponent.displayName = 'MovieRuntimeView';

const MovieRatingViewComponent = ({ caption, tone = 'warning', value }: MovieRatingProps) => {
  return <Rating caption={caption} tone={tone} value={value} />;
};

MovieRatingViewComponent.displayName = 'MovieRatingView';

const MovieProgressViewComponent = ({
  progress,
  showLabel = true,
  tone = 'primary',
}: MovieProgressProps) => {
  return <ProgressBar progress={progress} showLabel={showLabel} tone={tone} />;
};

MovieProgressViewComponent.displayName = 'MovieProgressView';

const QualityBadgeViewComponent = ({ label, tone = 'info' }: QualityBadgeProps) => {
  return <Badge label={label} tone={tone} variant="outline" />;
};

QualityBadgeViewComponent.displayName = 'QualityBadgeView';

const AgeRatingBadgeViewComponent = ({ label, tone = 'neutral' }: AgeRatingBadgeProps) => {
  return <Badge label={label} tone={tone} variant="soft" />;
};

AgeRatingBadgeViewComponent.displayName = 'AgeRatingBadgeView';

const MovieMetadataViewComponent = ({
  renderedMetadataItems,
  wrap = true,
}: MovieMetadataViewProps) => {
  return <MetadataRow items={renderedMetadataItems} wrap={wrap} />;
};

MovieMetadataViewComponent.displayName = 'MovieMetadataView';

const MovieInfoViewComponent = ({
  actions,
  description,
  genres,
  metadata,
  subtitle,
  title,
}: MovieInfoProps) => {
  return (
    <Stack gap="md" style={styles.content}>
      <Stack gap="xs">
        <AppText variant="title">{title}</AppText>
        {subtitle ? <AppText colorToken="textSecondary">{subtitle}</AppText> : null}
        {description ? <AppText colorToken="textSecondary">{description}</AppText> : null}
      </Stack>
      {metadata}
      {genres?.length ? <GenreList genres={genres} /> : null}
      {actions}
    </Stack>
  );
};

MovieInfoViewComponent.displayName = 'MovieInfoView';

const MovieStatisticsViewComponent = ({ renderedItems }: MovieStatisticsViewProps) => {
  return (
    <AppView gap="md" row style={styles.statistics} wrap="wrap">
      {renderedItems}
    </AppView>
  );
};

MovieStatisticsViewComponent.displayName = 'MovieStatisticsView';

export const MoviePosterView = memo(MoviePosterViewComponent);
export const MovieThumbnailView = memo(MovieThumbnailViewComponent);
export const MovieRuntimeView = memo(MovieRuntimeViewComponent);
export const MovieRatingView = memo(MovieRatingViewComponent);
export const MovieProgressView = memo(MovieProgressViewComponent);
export const QualityBadgeView = memo(QualityBadgeViewComponent);
export const AgeRatingBadgeView = memo(AgeRatingBadgeViewComponent);
export const MovieMetadataView = memo(MovieMetadataViewComponent);
export const MovieInfoView = memo(MovieInfoViewComponent);
export const MovieStatisticsView = memo(MovieStatisticsViewComponent);
