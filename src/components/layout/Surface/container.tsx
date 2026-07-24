import React, { memo } from 'react';

import type { SurfaceProps } from './types';
import { SurfaceView } from './view';

const SurfaceComponent = ({
  bordered = true,
  borderColorToken,
  elevation,
  padding = 'lg',
  radius = 'sm',
  shadow,
  variant = 'base',
  ...restProps
}: SurfaceProps) => {
  const variantProps =
    variant === 'secondary'
      ? {
          backgroundColorToken: 'surfaceSecondary' as const,
          shadow: undefined,
          elevation: undefined,
        }
      : variant === 'elevated'
        ? {
            backgroundColorToken: 'card' as const,
            shadow: shadow ?? 'md',
            elevation: elevation ?? 'md',
          }
        : variant === 'overlay'
          ? {
              backgroundColorToken: 'glassOverlay' as const,
              shadow: shadow ?? 'sm',
              elevation: elevation ?? 'sm',
            }
          : {
              backgroundColorToken: 'surface' as const,
              shadow: shadow ?? 'sm',
              elevation: elevation ?? 'sm',
            };

  return (
    <SurfaceView
      borderColorToken={bordered ? borderColorToken ?? 'divider' : undefined}
      borderWidth={bordered ? 1 : 0}
      padding={padding}
      radius={radius}
      {...variantProps}
      {...restProps}
    />
  );
};

SurfaceComponent.displayName = 'Surface';

export const Surface = memo(SurfaceComponent);
