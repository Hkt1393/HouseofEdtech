import React, { memo } from 'react';

import { DetailsView } from './view';

const DetailsContainerComponent = () => {
  return <DetailsView />;
};

DetailsContainerComponent.displayName = 'DetailsContainer';

export const DetailsContainer = memo(DetailsContainerComponent);
