/**
 * Public props for feature-level search components.
 */

import type { SearchCardProps } from '../Cards';

export interface SearchChipItem {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  id: string;
  label: string;
  onPress?: () => void;
}

export interface SearchSuggestionsProps {
  items: readonly SearchChipItem[];
  onItemPress?: (item: SearchChipItem) => void;
  title?: string;
}

export interface RecentSearchesProps extends SearchSuggestionsProps {}

export interface TrendingSearchesProps extends SearchSuggestionsProps {}

export interface SearchResultItemProps extends SearchCardProps {}
