import React, { memo, useCallback } from 'react';

import { ROUTES } from '../../constants';
import type { RootStackScreenProps } from '../../types';
import { SettingsView } from './view';

const SettingsContainerComponent = ({
  navigation,
}: RootStackScreenProps<typeof ROUTES.SETTINGS>) => {
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleBackToHome = useCallback(() => {
    navigation.navigate(ROUTES.MAIN_TABS, {
      screen: ROUTES.HOME,
    });
  }, [navigation]);

  return (
    <SettingsView
      onBackToHome={handleBackToHome}
      onGoBack={handleGoBack}
    />
  );
};

SettingsContainerComponent.displayName = 'SettingsContainer';

export const SettingsContainer = memo(SettingsContainerComponent);
