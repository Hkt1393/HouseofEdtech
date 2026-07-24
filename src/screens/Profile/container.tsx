import React, { memo } from 'react';

import { ProfileView } from './view';

const ProfileContainerComponent = () => {
  return <ProfileView />;
};

ProfileContainerComponent.displayName = 'ProfileContainer';

export const ProfileContainer = memo(ProfileContainerComponent);
