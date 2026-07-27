/**
 * Public props for feature-level player components.
 */

import type { ReactNode } from 'react';

import type { EpisodeCardProps } from '../Cards';

export interface PlayButtonProps {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  label?: string;
  onPress?: () => void;
}

export interface PlayerControlAction {
  accessibilityHint?: string;
  accessibilityLabel: string;
  icon: ReactNode;
  id: string;
  onPress?: () => void;
  selected?: boolean;
}

export interface PlayerControlsProps {
  leadingActions?: readonly PlayerControlAction[];
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
  trailingActions?: readonly PlayerControlAction[];
}

export interface SeasonOption {
  id: string;
  label: string;
  selected?: boolean;
}

export interface SeasonSelectorProps {
  onSelect?: (season: SeasonOption) => void;
  seasons: readonly SeasonOption[];
}

export interface EpisodeSelectorProps {
  episodes: readonly EpisodeCardProps[];
  onEpisodePress?: (episode: EpisodeCardProps, index: number) => void;
}
