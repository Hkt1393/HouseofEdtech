import React, { memo } from 'react';

import type { AppModalProps } from './types';
import { AppModalView } from './view';

const AppModalComponent = ({
  animationType = 'fade',
  presentationStyle = 'overFullScreen',
  statusBarTranslucent = true,
  transparent = true,
  ...restProps
}: AppModalProps) => {
  return (
    <AppModalView
      animationType={animationType}
      presentationStyle={presentationStyle}
      statusBarTranslucent={statusBarTranslucent}
      transparent={transparent}
      {...restProps}
    />
  );
};

AppModalComponent.displayName = 'AppModal';

export const AppModal = memo(AppModalComponent);
