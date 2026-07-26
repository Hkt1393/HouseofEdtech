import React, { memo } from 'react';

import { ROUTES } from '../../constants';
import type { RootStackScreenProps } from '../../types';

import { DetailsView } from './view';

const DetailsContainerComponent = (
  _props: RootStackScreenProps<typeof ROUTES.MOVIE_DETAILS>,
) => {
  return <DetailsView />;
};

DetailsContainerComponent.displayName = 'DetailsContainer';

export const DetailsContainer = memo(DetailsContainerComponent);
