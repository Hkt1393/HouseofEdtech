import React, { memo, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';

import type { DividerProps } from './types';
import { DividerView } from './view';

const DividerComponent = ({
  backgroundColorToken = 'divider',
  orientation = 'horizontal',
  style,
  thickness = COMPONENT_DEFAULTS.layout.dividerThickness,
  ...restProps
}: DividerProps) => {
  const resolvedStyle = useMemo<ViewStyle>(
    () =>
      orientation === 'vertical'
        ? {
            width: moderateScale(thickness),
            alignSelf: 'stretch',
          }
        : {
            height: moderateScale(thickness),
            width: '100%',
          },
    [orientation, thickness],
  );

  return (
    <DividerView
      backgroundColorToken={backgroundColorToken}
      resolvedStyle={[resolvedStyle, style]}
      {...restProps}
    />
  );
};

DividerComponent.displayName = 'Divider';

export const Divider = memo(DividerComponent);
