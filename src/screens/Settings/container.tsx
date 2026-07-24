import React, { memo } from 'react';

import { SettingsView } from './view';

const SettingsContainerComponent = () => {
  return <SettingsView />;
};

SettingsContainerComponent.displayName = 'SettingsContainer';

export const SettingsContainer = memo(SettingsContainerComponent);
