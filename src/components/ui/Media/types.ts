/**
 * Public props for feature-level media components.
 */

import type { ReactNode } from 'react';

import type { StatItemProps } from '../ContentPrimitives';
import type { SemanticTone } from '../shared';
import type { MetadataRowItem } from '../Shared';

export interface MoviePosterProps {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  badgeLabel?: string;
  metadataLabel?: string;
  onPress?: () => void;
  posterUrl: string;
  progress?: number;
  title?: string;
}

export interface MovieThumbnailProps {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  durationLabel?: string;
  imageUrl: string;
  metadataLabel?: string;
  onPress?: () => void;
  title?: string;
}

export interface MovieRuntimeProps {
  icon?: ReactNode;
  label: string;
  tone?: SemanticTone;
}

export interface MovieRatingProps {
  caption?: string;
  tone?: SemanticTone;
  value: number | string;
}

export interface MovieProgressProps {
  progress: number;
  showLabel?: boolean;
  tone?: SemanticTone;
}

export interface WatchProgressProps extends MovieProgressProps {}

export interface QualityBadgeProps {
  label: string;
  tone?: SemanticTone;
}

export interface AgeRatingBadgeProps {
  label: string;
  tone?: SemanticTone;
}

export interface MovieMetadataProps {
  ageRatingLabel?: string;
  extraItems?: readonly MetadataRowItem[];
  qualityLabel?: string;
  ratingCaption?: string;
  ratingValue?: number | string;
  runtimeLabel?: string;
  wrap?: boolean;
}

export interface MovieInfoProps {
  actions?: ReactNode;
  description?: string;
  genres?: readonly string[];
  metadata?: ReactNode;
  subtitle?: string;
  title: string;
}

export interface MovieStatisticsProps {
  items: readonly StatItemProps[];
}

export interface MovieMetadataViewProps {
  renderedMetadataItems: readonly MetadataRowItem[];
  wrap?: boolean;
}

export interface MovieStatisticsViewProps {
  renderedItems: ReactNode[];
}
