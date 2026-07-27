/**
 * Public props for shared content primitives.
 */

import type { ReactNode } from 'react';

import type { InteractiveAccessibilityProps, SemanticTone } from '../shared';

export type PrimitiveSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends InteractiveAccessibilityProps {
  fallbackLabel?: string;
  imageUrl?: string | null;
  onPress?: () => void;
  size?: PrimitiveSize;
}

export interface BadgeProps {
  label: string;
  leadingIcon?: ReactNode;
  tone?: SemanticTone;
  variant?: 'solid' | 'soft' | 'outline';
}

export interface TagProps extends BadgeProps {}

export interface GenreChipProps {
  genre: string;
}

export interface RatingProps {
  caption?: string;
  maxValue?: number;
  showIcon?: boolean;
  tone?: SemanticTone;
  value: number | string;
}

export interface ProgressBarProps {
  height?: 'sm' | 'md' | 'lg';
  progress: number;
  showLabel?: boolean;
  tone?: SemanticTone;
}

export interface PosterProps extends InteractiveAccessibilityProps {
  badgeLabel?: string;
  imageTransitionDuration?: number;
  onPress?: () => void;
  posterUrl: string;
  progress?: number;
  showImageLoadingState?: boolean;
  subtitle?: string;
  title?: string;
  width?: number;
}

export interface ThumbnailProps extends InteractiveAccessibilityProps {
  durationLabel?: string;
  imageUrl: string;
  onPress?: () => void;
  subtitle?: string;
  title?: string;
  width?: number;
}

export interface LabelValueRowProps extends InteractiveAccessibilityProps {
  description?: string;
  label: string;
  onPress?: () => void;
  trailingAccessory?: ReactNode;
  value: string;
}

export interface InfoChipProps {
  icon?: ReactNode;
  label: string;
  tone?: SemanticTone;
}

export interface StatItemProps {
  description?: string;
  label: string;
  value: string;
}
