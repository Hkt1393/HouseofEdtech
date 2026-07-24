import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

import { styles } from './styles';
import type { AppActivityIndicatorViewProps } from './types';

const AppActivityIndicatorViewComponent = ({
  resolvedColor,
  resolvedStyle,
  ...restProps
}: AppActivityIndicatorViewProps) => {
  return (
    <ActivityIndicator
      color={resolvedColor}
      style={[styles.indicator, resolvedStyle]}
      {...restProps}
    />
  );
};

AppActivityIndicatorViewComponent.displayName = 'AppActivityIndicatorView';

export const AppActivityIndicatorView = memo(AppActivityIndicatorViewComponent);
