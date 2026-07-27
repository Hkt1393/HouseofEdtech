/**
 * Public props for reusable card components.
 */

import type { ReactNode } from 'react';

import type { AppImageSource } from '../../base/AppImage';
import type { AppVideoProps } from '../../base/AppVideo';

import type { InteractiveAccessibilityProps } from '../shared';

export interface MovieCardProps extends InteractiveAccessibilityProps {
  badgeLabel?: string;
  id?: string;
  imageTransitionDuration?: number;
  metadataLabel?: string;
  onPress?: () => void;
  posterUrl: string;
  progress?: number;
  showImageLoadingState?: boolean;
  subtitle?: string;
  thumbnailUrl?: string;
  title: string;
}

export interface HeroCardProps extends InteractiveAccessibilityProps {
  badgeLabel?: string;
  description?: string;
  id?: string;
  imageUrl: string;
  onPress?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  subtitle?: string;
  title: string;
}

export interface EpisodeCardProps extends InteractiveAccessibilityProps {
  description?: string;
  eyebrow?: string;
  id?: string;
  imageUrl: string;
  onPress?: () => void;
  trailingAccessory?: ReactNode;
  title: string;
}

export interface ContinueWatchingCardProps extends InteractiveAccessibilityProps {
  id?: string;
  imageUrl: string;
  onPress?: () => void;
  progress: number;
  remainingLabel?: string;
  title: string;
}

export interface DownloadCardProps extends InteractiveAccessibilityProps {
  onPress?: () => void;
  posterUrl: string;
  progress?: number;
  qualityLabel?: string;
  statusLabel: string;
  title: string;
}

export interface ProfileCardProps extends InteractiveAccessibilityProps {
  avatarLabel?: string;
  avatarUrl?: string | null;
  name: string;
  onPress?: () => void;
  planLabel?: string;
  subtitle: string;
}

export interface SettingsCardProps extends InteractiveAccessibilityProps {
  description?: string;
  onPress?: () => void;
  title: string;
  trailingAccessory?: ReactNode;
  value?: string;
}

export interface SearchCardProps extends InteractiveAccessibilityProps {
  id?: string;
  imageUrl: string;
  metadataLabel?: string;
  onPress?: () => void;
  subtitle?: string;
  title: string;
}

export interface CategoryCardProps extends InteractiveAccessibilityProps {
  countLabel?: string;
  description?: string;
  id?: string;
  imageUrl?: string;
  onPress?: () => void;
  title: string;
}

export interface FeaturedMovieCardProps extends InteractiveAccessibilityProps {
  activeIndicatorIndex?: number;
  badgeLabel?: string;
  backgroundImageSource?: AppImageSource;
  backgroundVideoSource?: AppVideoProps['source'];
  description?: string;
  id?: string;
  metadata?: ReactNode;
  onIndicatorSelect?: (index: number) => void;
  onPress?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  subtitle?: string;
  title: string;
  totalIndicators?: number;
}

export interface RecommendationCardProps extends InteractiveAccessibilityProps {
  badgeLabel?: string;
  id?: string;
  imageUrl: string;
  metadataLabel?: string;
  onPress?: () => void;
  subtitle?: string;
  title: string;
}
