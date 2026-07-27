import React, { memo, useMemo } from 'react';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { isTablet } from '../../../utils';

import type { ScreenProps } from './types';
import { ScreenView } from './view';

const ScreenComponent = ({
  contentContainerStyle,
  scrollProps,
  scrollable = false,
  style,
  ...restProps
}: ScreenProps) => {
  const resolvedContentContainerStyle = useMemo(
    () => [
      scrollable ? { flexGrow: 1 } : { flex: 1 },
      {
        paddingHorizontal: undefined,
      },
      contentContainerStyle,
    ],
    [contentContainerStyle, scrollable],
  );

  const resolvedStyle = useMemo(() => [{ flex: 1, }, style], [style]);

  return (
    <ScreenView
      paddingHorizontal={
        isTablet() ? 'containerMarginDesktop' : 'containerMarginMobile'
      }
      resolvedContentContainerStyle={resolvedContentContainerStyle}
      resolvedStyle={resolvedStyle}
      scrollProps={{
        contentPaddingHorizontal: isTablet()
          ? 'containerMarginDesktop'
          : 'containerMarginMobile',
        ...scrollProps,
      }}
      scrollable={scrollable}
      {...restProps}
    />
  );
};

ScreenComponent.displayName = 'Screen';

export const Screen = memo(ScreenComponent);
