import React, { memo } from 'react';

import { LoginView } from './view';

const LoginContainerComponent = () => {
  return <LoginView />;
};

LoginContainerComponent.displayName = 'LoginContainer';

export const LoginContainer = memo(LoginContainerComponent);
