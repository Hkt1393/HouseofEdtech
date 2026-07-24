import React, { memo, useMemo } from 'react';

import { APP_STRINGS } from '../../../constants';
import { useTheme } from '../../../theme';

import { resolveColorToken } from '../shared';

import type { AppActivityIndicatorProps } from './types';
import { AppActivityIndicatorView } from './view';

const AppActivityIndicatorComponent = ({
  accessibilityLabel = APP_STRINGS.components.activityIndicator.accessibilityLabel,
  animating = true,
  colorToken = 'primary',
  style,
  ...restProps
}: AppActivityIndicatorProps) => {
  const { colors } = useTheme();

  const resolvedColor = useMemo(
    () => resolveColorToken(colorToken, colors) ?? colors.primary,
    [colorToken, colors],
  );

  return (
    <AppActivityIndicatorView
      accessibilityLabel={accessibilityLabel}
      animating={animating}
      resolvedColor={resolvedColor}
      resolvedStyle={style}
      {...restProps}
    />
  );
};

AppActivityIndicatorComponent.displayName = 'AppActivityIndicator';

export const AppActivityIndicator = memo(AppActivityIndicatorComponent);
