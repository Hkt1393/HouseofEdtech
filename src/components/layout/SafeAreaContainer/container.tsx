import React, { memo, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppView } from '../../base';

import { createSafeAreaStyle, DEFAULT_SAFE_AREA_EDGES } from '../shared';

import { styles } from './styles';
import type { SafeAreaContainerProps } from './types';
import { SafeAreaContainerView } from './view';

const SafeAreaContainerComponent = ({
  edges = DEFAULT_SAFE_AREA_EDGES,
  mode = 'padding',
  style,
  ...restProps
}: SafeAreaContainerProps) => {
  const insets = useSafeAreaInsets();

  const resolvedStyle = useMemo(
    () => [styles.root, createSafeAreaStyle(insets, edges, mode) as ViewStyle, style],
    [edges, insets, mode, style],
  );

  return <SafeAreaContainerView resolvedStyle={resolvedStyle} {...restProps} />;
};

SafeAreaContainerComponent.displayName = 'SafeAreaContainer';

export const SafeAreaContainer = memo(SafeAreaContainerComponent);
