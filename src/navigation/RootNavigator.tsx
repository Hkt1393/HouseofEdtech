import React, { memo } from 'react';

import { RootStackNavigator } from './RootStackNavigator';

const RootNavigatorComponent = () => {
  return <RootStackNavigator />;
};

RootNavigatorComponent.displayName = 'RootNavigator';

export const RootNavigator = memo(RootNavigatorComponent);
