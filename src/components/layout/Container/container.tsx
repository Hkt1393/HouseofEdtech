import React, { memo, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale, isTablet } from '../../../utils';

import { createDynamicStyles, styles } from './styles';
import type { ContainerProps } from './types';
import { ContainerView } from './view';

const ContainerComponent = ({
  maxWidth = COMPONENT_DEFAULTS.layout.maxContentWidth,
  paddingHorizontal = isTablet()
    ? 'containerMarginDesktop'
    : 'containerMarginMobile',
  style,
  ...restProps
}: ContainerProps) => {
  const dynamicStyles = useMemo(
    () =>
      createDynamicStyles({
        maxWidth: moderateScale(maxWidth),
      }),
    [maxWidth],
  );

  const resolvedStyle = useMemo(
    () => [styles.root, dynamicStyles.root, style],
    [dynamicStyles.root, style],
  );

  return (
    <ContainerView
      paddingHorizontal={paddingHorizontal}
      resolvedStyle={resolvedStyle}
      {...restProps}
    />
  );
};

ContainerComponent.displayName = 'Container';

export const Container = memo(ContainerComponent);
