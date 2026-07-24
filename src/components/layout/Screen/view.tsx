import React, { memo } from 'react';

import { AppScrollView, AppView } from '../../base';

import { SafeAreaContainer } from '../SafeAreaContainer';

import { styles } from './styles';
import type { ScreenViewProps } from './types';

const ScreenViewComponent = ({
  children,
  contentContainerStyle,
  footer,
  resolvedContentContainerStyle,
  resolvedStyle,
  safeAreaEdges,
  scrollProps,
  scrollable = false,
  ...restProps
}: ScreenViewProps) => {
  return (
    <SafeAreaContainer
      backgroundColorToken="background"
      edges={safeAreaEdges}
      flex
      style={resolvedStyle}
    >
      {scrollable ? (
        <AppScrollView
          contentContainerStyle={resolvedContentContainerStyle}
          style={styles.fill}
          {...scrollProps}
        >
          {children}
        </AppScrollView>
      ) : (
        <AppView flex style={resolvedContentContainerStyle} {...restProps}>
          {children}
        </AppView>
      )}
      {footer}
    </SafeAreaContainer>
  );
};

ScreenViewComponent.displayName = 'ScreenView';

export const ScreenView = memo(ScreenViewComponent);
