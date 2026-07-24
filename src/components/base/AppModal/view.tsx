import React, { memo } from 'react';
import { Modal } from 'react-native';

import { AppView } from '../AppView';

import { styles } from './styles';
import type { AppModalViewProps } from './types';

const AppModalViewComponent = ({
  children,
  ...restProps
}: AppModalViewProps) => {
  return (
    <Modal {...restProps}>
      <AppView flex style={styles.root}>
        {children}
      </AppView>
    </Modal>
  );
};

AppModalViewComponent.displayName = 'AppModalView';

export const AppModalView = memo(AppModalViewComponent);
