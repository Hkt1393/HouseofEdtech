import React, { memo } from 'react';

import type {
  RecentSearchesProps,
  SearchResultItemProps,
  SearchSuggestionsProps,
  TrendingSearchesProps,
} from './types';
import {
  RecentSearchesView,
  SearchResultItemView,
  SearchSuggestionsView,
  TrendingSearchesView,
} from './view';

const SearchSuggestionsComponent = (props: SearchSuggestionsProps) => (
  <SearchSuggestionsView {...props} />
);
SearchSuggestionsComponent.displayName = 'SearchSuggestions';

const RecentSearchesComponent = (props: RecentSearchesProps) => (
  <RecentSearchesView {...props} />
);
RecentSearchesComponent.displayName = 'RecentSearches';

const TrendingSearchesComponent = (props: TrendingSearchesProps) => (
  <TrendingSearchesView {...props} />
);
TrendingSearchesComponent.displayName = 'TrendingSearches';

const SearchResultItemComponent = (props: SearchResultItemProps) => (
  <SearchResultItemView {...props} />
);
SearchResultItemComponent.displayName = 'SearchResultItem';

export const SearchSuggestions = memo(SearchSuggestionsComponent);
export const RecentSearches = memo(RecentSearchesComponent);
export const TrendingSearches = memo(TrendingSearchesComponent);
export const SearchResultItem = memo(SearchResultItemComponent);
