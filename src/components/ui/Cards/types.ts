/**
 * Public props for reusable card components.
 */

import type { ReactNode } from 'react';

import type { InteractiveAccessibilityProps } from '../shared';

export interface MovieCardProps extends InteractiveAccessibilityProps {
  badgeLabel?: string;
  metadataLabel?: string;
  onPress?: () => void;
  posterUrl: string;
  progress?: number;
  subtitle?: string;
  title: string;
}

export interface HeroCardProps extends InteractiveAccessibilityProps {
  badgeLabel?: string;
  description?: string;
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
  imageUrl: string;
  onPress?: () => void;
  trailingAccessory?: ReactNode;
  title: string;
}

export interface ContinueWatchingCardProps extends InteractiveAccessibilityProps {
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
  imageUrl: string;
  metadataLabel?: string;
  onPress?: () => void;
  subtitle?: string;
  title: string;
}

export interface CategoryCardProps extends InteractiveAccessibilityProps {
  countLabel?: string;
  description?: string;
  imageUrl?: string;
  onPress?: () => void;
  title: string;
}
