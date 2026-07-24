import React, { memo } from 'react';

import { SearchView } from './view';

const SearchContainerComponent = () => {
  return <SearchView />;
};

SearchContainerComponent.displayName = 'SearchContainer';

export const SearchContainer = memo(SearchContainerComponent);
