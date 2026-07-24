import React, { forwardRef, memo, useMemo } from 'react';
import {
  RefreshControl,
  ScrollView,
  type RefreshControlProps,
  type ViewStyle,
} from 'react-native';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { useTheme } from '../../../theme';

import {
  resolveColorToken,
  resolveSpacingValue,
} from '../shared';

import { createDynamicStyles, styles } from './styles';
import type { AppScrollViewProps } from './types';
import { AppScrollViewView } from './view';

const AppScrollViewContainerComponent = forwardRef<ScrollView, AppScrollViewProps>(
  (
    {
      backgroundColorToken,
      bounces = COMPONENT_DEFAULTS.scrollView.bounces,
      contentContainerStyle,
      contentGap,
      contentPadding,
      contentPaddingHorizontal,
      contentPaddingVertical,
      keyboardShouldPersistTaps = COMPONENT_DEFAULTS.scrollView.keyboardShouldPersistTaps,
      onRefresh,
      refreshControl,
      refreshing,
      refreshTintColorToken = 'primary',
      showsHorizontalScrollIndicator = COMPONENT_DEFAULTS.scrollView.showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator = COMPONENT_DEFAULTS.scrollView.showsVerticalScrollIndicator,
      style,
      ...restProps
    },
    ref,
  ) => {
    const { colors, spacing } = useTheme();

    const resolvedScrollViewStyleObject = useMemo<ViewStyle>(
      () => ({
        backgroundColor: resolveColorToken(backgroundColorToken, colors),
      }),
      [backgroundColorToken, colors],
    );

    const resolvedContentContainerStyleObject = useMemo<ViewStyle>(
      () => ({
        gap: resolveSpacingValue(contentGap, spacing),
        padding: resolveSpacingValue(contentPadding, spacing),
        paddingHorizontal: resolveSpacingValue(contentPaddingHorizontal, spacing),
        paddingVertical: resolveSpacingValue(contentPaddingVertical, spacing),
      }),
      [
        contentGap,
        contentPadding,
        contentPaddingHorizontal,
        contentPaddingVertical,
        spacing,
      ],
    );

    const dynamicStyles = useMemo(
      () =>
        createDynamicStyles(
          resolvedScrollViewStyleObject,
          resolvedContentContainerStyleObject,
        ),
      [resolvedContentContainerStyleObject, resolvedScrollViewStyleObject],
    );

    const resolvedStyle = useMemo(
      () => [styles.scrollView, dynamicStyles.scrollView, style],
      [dynamicStyles.scrollView, style],
    );

    const resolvedContentContainerStyle = useMemo(
      () => [dynamicStyles.contentContainer, contentContainerStyle],
      [contentContainerStyle, dynamicStyles.contentContainer],
    );

    const resolvedRefreshControl = useMemo<
      React.ReactElement<RefreshControlProps> | undefined
    >(() => {
      if (refreshControl) {
        return refreshControl;
      }

      if (!onRefresh) {
        return undefined;
      }

      const tintColor =
        resolveColorToken(refreshTintColorToken, colors) ?? colors.primary;

      return (
        <RefreshControl
          colors={[tintColor]}
          onRefresh={onRefresh}
          progressBackgroundColor={colors.surfaceLow}
          refreshing={Boolean(refreshing)}
          tintColor={tintColor}
        />
      );
    }, [colors, onRefresh, refreshControl, refreshTintColorToken, refreshing]);

    return (
      <AppScrollViewView
        bounces={bounces}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        ref={ref}
        resolvedContentContainerStyle={resolvedContentContainerStyle}
        resolvedRefreshControl={resolvedRefreshControl}
        resolvedStyle={resolvedStyle}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        {...restProps}
      />
    );
  },
);

AppScrollViewContainerComponent.displayName = 'AppScrollView';

export const AppScrollView = memo(AppScrollViewContainerComponent);
