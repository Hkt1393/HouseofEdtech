import React, { memo, useMemo } from 'react';

import { APP_STRINGS, COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';

import type {
  AppButtonProps,
  ChipButtonProps,
  FloatingActionButtonProps,
  IconButtonProps,
  SegmentButtonProps,
} from './types';
import { createDynamicStyles } from './styles';
import { AppButtonView } from './view';

const sizeMap = {
  sm: {
    minHeight: moderateScale(COMPONENT_DEFAULTS.button.minHeightSm),
    sizeValue: moderateScale(COMPONENT_DEFAULTS.button.iconButtonSizeSm),
  },
  md: {
    minHeight: moderateScale(COMPONENT_DEFAULTS.button.minHeightMd),
    sizeValue: moderateScale(COMPONENT_DEFAULTS.button.iconButtonSizeMd),
  },
  lg: {
    minHeight: moderateScale(COMPONENT_DEFAULTS.button.minHeightLg),
    sizeValue: moderateScale(COMPONENT_DEFAULTS.button.iconButtonSizeLg),
  },
} as const;

const AppButtonComponent = ({
  selected = false,
  size = 'md',
  variant = 'primary',
  ...restProps
}: AppButtonProps) => {
  const resolvedAccessibilityHint = useMemo(() => {
    if (restProps.accessibilityHint) {
      return restProps.accessibilityHint;
    }

    switch (variant) {
      case 'secondary':
        return APP_STRINGS.components.button.secondaryAccessibilityHint;
      case 'ghost':
        return APP_STRINGS.components.button.ghostAccessibilityHint;
      case 'text':
        return APP_STRINGS.components.button.textAccessibilityHint;
      case 'icon':
        return APP_STRINGS.components.button.iconAccessibilityHint;
      case 'fab':
        return APP_STRINGS.components.button.floatingAccessibilityHint;
      case 'chip':
        return APP_STRINGS.components.button.chipAccessibilityHint;
      case 'segment':
        return APP_STRINGS.components.button.segmentAccessibilityHint;
      case 'primary':
      default:
        return APP_STRINGS.components.button.primaryAccessibilityHint;
    }
  }, [restProps.accessibilityHint, variant]);

  const variantProps = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColorToken: 'secondaryContainer' as const,
          borderColorToken: undefined,
          labelColorToken: 'onSecondaryContainer' as const,
        };
      case 'ghost':
        return {
          backgroundColorToken: 'transparent' as const,
          borderColorToken: 'divider' as const,
          labelColorToken: 'textPrimary' as const,
        };
      case 'text':
        return {
          backgroundColorToken: 'transparent' as const,
          borderColorToken: undefined,
          labelColorToken: 'primary' as const,
        };
      case 'icon':
        return {
          backgroundColorToken: 'surfaceSecondary' as const,
          borderColorToken: undefined,
          labelColorToken: 'textPrimary' as const,
        };
      case 'fab':
        return {
          backgroundColorToken: 'primary' as const,
          borderColorToken: undefined,
          labelColorToken: 'onPrimary' as const,
        };
      case 'chip':
        return {
          backgroundColorToken: selected
            ? ('primaryContainer' as const)
            : ('surfaceSecondary' as const),
          borderColorToken: selected ? undefined : ('divider' as const),
          labelColorToken: selected
            ? ('onPrimaryContainer' as const)
            : ('textSecondary' as const),
        };
      case 'segment':
        return {
          backgroundColorToken: selected ? ('primary' as const) : ('transparent' as const),
          borderColorToken: selected ? undefined : ('divider' as const),
          labelColorToken: selected ? ('onPrimary' as const) : ('textSecondary' as const),
        };
      case 'primary':
      default:
        return {
          backgroundColorToken: 'primary' as const,
          borderColorToken: undefined,
          labelColorToken: 'onPrimary' as const,
        };
    }
  }, [selected, variant]);

  const dynamicStyles = useMemo(
    () => createDynamicStyles(sizeMap[size].minHeight, sizeMap[size].sizeValue),
    [size],
  );

  const resolvedAccessibilityState = useMemo(
    () => ({
      busy: restProps.loading || undefined,
      disabled: restProps.disabled || restProps.loading || undefined,
      selected:
        variant === 'chip' || variant === 'segment'
          ? selected || undefined
          : undefined,
      ...restProps.accessibilityState,
    }),
    [restProps.accessibilityState, restProps.disabled, restProps.loading, selected, variant],
  );

  return (
    <AppButtonView
      {...sizeMap[size]}
      resolvedAccessibilityHint={resolvedAccessibilityHint}
      resolvedAccessibilityState={resolvedAccessibilityState}
      resolvedStyle={dynamicStyles.surface}
      variant={variant}
      {...variantProps}
      {...restProps}
    />
  );
};

AppButtonComponent.displayName = 'AppButton';

const PrimaryButtonComponent = (props: AppButtonProps) => <AppButtonComponent variant="primary" {...props} />;
PrimaryButtonComponent.displayName = 'PrimaryButton';

const SecondaryButtonComponent = (props: AppButtonProps) => (
  <AppButtonComponent variant="secondary" {...props} />
);
SecondaryButtonComponent.displayName = 'SecondaryButton';

const GhostButtonComponent = (props: AppButtonProps) => <AppButtonComponent variant="ghost" {...props} />;
GhostButtonComponent.displayName = 'GhostButton';

const TextButtonComponent = (props: AppButtonProps) => <AppButtonComponent variant="text" {...props} />;
TextButtonComponent.displayName = 'TextButton';

const IconButtonComponent = (props: IconButtonProps) => (
  <AppButtonComponent fullWidth={false} size="md" variant="icon" {...props} />
);
IconButtonComponent.displayName = 'IconButton';

const FloatingActionButtonComponent = (props: FloatingActionButtonProps) => (
  <AppButtonComponent size="lg" variant="fab" {...props} />
);
FloatingActionButtonComponent.displayName = 'FloatingActionButton';

const ChipButtonComponent = (props: ChipButtonProps) => (
  <AppButtonComponent size="sm" variant="chip" {...props} />
);
ChipButtonComponent.displayName = 'ChipButton';

const SegmentButtonComponent = (props: SegmentButtonProps) => (
  <AppButtonComponent size="sm" variant="segment" {...props} />
);
SegmentButtonComponent.displayName = 'SegmentButton';

export const AppButton = memo(AppButtonComponent);
export const PrimaryButton = memo(PrimaryButtonComponent);
export const SecondaryButton = memo(SecondaryButtonComponent);
export const GhostButton = memo(GhostButtonComponent);
export const TextButton = memo(TextButtonComponent);
export const IconButton = memo(IconButtonComponent);
export const FloatingActionButton = memo(FloatingActionButtonComponent);
export const ChipButton = memo(ChipButtonComponent);
export const SegmentButton = memo(SegmentButtonComponent);
