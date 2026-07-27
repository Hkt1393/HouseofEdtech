import React, { memo } from 'react';

import { Section } from '../../layout';
import { SearchCard } from '../Cards';
import { GenreChipGroup } from '../Shared';

import type {
  RecentSearchesProps,
  SearchResultItemProps,
  SearchSuggestionsProps,
  TrendingSearchesProps,
} from './types';

const SearchSuggestionsViewComponent = ({ items, onItemPress, title }: SearchSuggestionsProps) => {
  return (
    <Section title={title}>
      <GenreChipGroup
        items={items.map((item) => ({
          ...item,
          onPress: item.onPress ?? (onItemPress ? () => onItemPress(item) : undefined),
        }))}
      />
    </Section>
  );
};

SearchSuggestionsViewComponent.displayName = 'SearchSuggestionsView';

const RecentSearchesViewComponent = (props: RecentSearchesProps) => (
  <SearchSuggestionsViewComponent {...props} />
);

RecentSearchesViewComponent.displayName = 'RecentSearchesView';

const TrendingSearchesViewComponent = (props: TrendingSearchesProps) => (
  <SearchSuggestionsViewComponent {...props} />
);

TrendingSearchesViewComponent.displayName = 'TrendingSearchesView';

const SearchResultItemViewComponent = (props: SearchResultItemProps) => {
  return <SearchCard {...props} />;
};

SearchResultItemViewComponent.displayName = 'SearchResultItemView';

export const SearchSuggestionsView = memo(SearchSuggestionsViewComponent);
export const RecentSearchesView = memo(RecentSearchesViewComponent);
export const TrendingSearchesView = memo(TrendingSearchesViewComponent);
export const SearchResultItemView = memo(SearchResultItemViewComponent);
