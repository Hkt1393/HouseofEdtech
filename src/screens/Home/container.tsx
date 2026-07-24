import React, { memo } from 'react';

import { HomeView } from './view';

const HomeContainerComponent = () => {
  return <HomeView />;
};

HomeContainerComponent.displayName = 'HomeContainer';

export const HomeContainer = memo(HomeContainerComponent);
