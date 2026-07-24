import React, { memo, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

import { resolveSpacingValue } from '../../base/shared';

import type { SpacerProps } from './types';
import { SpacerView } from './view';

const SpacerComponent = ({
  size = 'md',
  style,
  ...restProps
}: SpacerProps) => {
  const { spacing } = useTheme();

  const resolvedSize = resolveSpacingValue(size, spacing);

  const resolvedStyle = useMemo<ViewStyle>(
    () => ({
      height: resolvedSize,
      width: resolvedSize,
    }),
    [resolvedSize],
  );

  return <SpacerView resolvedStyle={[resolvedStyle, style]} {...restProps} />;
};

SpacerComponent.displayName = 'Spacer';

export const Spacer = memo(SpacerComponent);
