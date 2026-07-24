import React, { memo } from 'react';

import { SplashView } from './view';

const SplashContainerComponent = () => {
  return <SplashView />;
};

SplashContainerComponent.displayName = 'SplashContainer';

export const SplashContainer = memo(SplashContainerComponent);
