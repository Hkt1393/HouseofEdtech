/**
 * Public props for shared feature-level UI components.
 */

import type { ReactNode } from 'react';

import type { InteractiveAccessibilityProps, SemanticTone } from '../shared';

export interface GenreListProps {
  genres: readonly string[];
}

export interface GenreChipGroupItem extends InteractiveAccessibilityProps {
  disabled?: boolean;
  id: string;
  label: string;
  onPress?: () => void;
  selected?: boolean;
}

export interface GenreChipGroupProps {
  items: readonly GenreChipGroupItem[];
  onSelect?: (item: GenreChipGroupItem) => void;
}

export interface RatingRowProps {
  caption?: string;
  label?: string;
  tone?: SemanticTone;
  trailingAccessory?: ReactNode;
  value: number | string;
}

export interface MetadataRowItem {
  id: string;
  label: string;
  leadingIcon?: ReactNode;
  tone?: SemanticTone;
  variant?: 'solid' | 'soft' | 'outline';
}

export interface MetadataRowProps {
  items: readonly MetadataRowItem[];
  wrap?: boolean;
}

export interface InformationRowItem extends InteractiveAccessibilityProps {
  description?: string;
  id: string;
  label: string;
  leadingAccessory?: ReactNode;
  onPress?: () => void;
  trailingAccessory?: ReactNode;
  value: string;
}

export interface InformationRowProps extends InformationRowItem {}

export interface DividerRowProps {
  label?: string;
  trailingAccessory?: ReactNode;
}

export interface EmptyLibraryProps {
  actionLabel?: string;
  description: string;
  illustration?: ReactNode;
  onAction?: () => void;
  title: string;
}

export interface NoInternetBannerProps extends InteractiveAccessibilityProps {
  actionLabel?: string;
  description?: string;
  icon?: ReactNode;
  onAction?: () => void;
  title: string;
}

export interface GenreListViewProps {
  renderedGenres: ReactNode[];
}

export interface GenreChipGroupViewProps {
  renderedItems: ReactNode[];
}

export interface MetadataRowViewProps {
  renderedItems: ReactNode[];
  wrap?: boolean;
}
