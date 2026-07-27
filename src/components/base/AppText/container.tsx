import React, { forwardRef, memo, useMemo } from 'react';
import { Text as RNText, type TextStyle } from 'react-native';

import { useTheme } from '../../../theme';

import {
  resolveColorToken,
  resolveFontWeight,
  resolveTypographyStyle,
} from '../shared';

import { createDynamicStyles, styles } from './styles';
import type { AppTextProps } from './types';
import { AppTextView } from './view';

const AppTextContainerComponent = forwardRef<
  React.ElementRef<typeof RNText>,
  AppTextProps
>(
  (
    {
      align,
      colorToken = 'textPrimary',
      style,
      variant = 'body',
      weight,
      ...restProps
    },
    ref,
  ) => {
    const { colors, typography } = useTheme();

    const resolvedTextStyle = useMemo<TextStyle>(
      () => ({
        ...resolveTypographyStyle(variant, typography),
        color: resolveColorToken(colorToken, colors) ?? colors.textPrimary,
        fontWeight: resolveFontWeight(weight, typography),
        textAlign: align,
      }),
      [align, colorToken, colors, typography, variant, weight],
    );

    const dynamicStyles = useMemo(
      () => createDynamicStyles(resolvedTextStyle),
      [resolvedTextStyle],
    );

    const resolvedStyle = useMemo(
      () => [styles.text, dynamicStyles.text, style],
      [dynamicStyles.text, style],
    );

    return (
      <AppTextView
        ref={ref}
        resolvedStyle={resolvedStyle}
        {...restProps}
      />
    );
  },
);

AppTextContainerComponent.displayName = 'AppText';

export const AppText = memo(AppTextContainerComponent);
