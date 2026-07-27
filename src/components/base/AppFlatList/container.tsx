import React, {
  forwardRef,
  memo,
  useCallback,
  useMemo,
} from 'react';
import {
  FlatList,
  RefreshControl,
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
import type { AppFlatListProps } from './types';
import { AppFlatListView } from './view';

interface KeyCandidate {
  id?: number | string;
  key?: number | string;
}

const AppFlatListContainerInner = <ItemT,>(
  {
    backgroundColorToken,
    contentContainerStyle,
    contentGap,
    contentPadding,
    contentPaddingHorizontal,
    contentPaddingVertical,
    keyExtractor,
    maxToRenderPerBatch = COMPONENT_DEFAULTS.flatList.maxToRenderPerBatch,
    onRefresh,
    refreshControl,
    refreshing,
    refreshTintColorToken = 'primary',
    removeClippedSubviews = COMPONENT_DEFAULTS.flatList.removeClippedSubviews,
    showsVerticalScrollIndicator = COMPONENT_DEFAULTS.flatList.showsVerticalScrollIndicator,
    style,
    windowSize = COMPONENT_DEFAULTS.flatList.windowSize,
    initialNumToRender = COMPONENT_DEFAULTS.flatList.initialNumToRender,
    keyboardShouldPersistTaps = COMPONENT_DEFAULTS.flatList.keyboardShouldPersistTaps,
    ...restProps
  }: AppFlatListProps<ItemT>,
  ref: React.ForwardedRef<FlatList<ItemT>>,
) => {
  const { colors, spacing } = useTheme();

  const resolvedListStyleObject = useMemo<ViewStyle>(
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
        resolvedListStyleObject,
        resolvedContentContainerStyleObject,
      ),
    [resolvedContentContainerStyleObject, resolvedListStyleObject],
  );

  const resolvedStyle = useMemo(
    () => [styles.list, dynamicStyles.list, style],
    [dynamicStyles.list, style],
  );

  const resolvedContentContainerStyle = useMemo(
    () => [dynamicStyles.contentContainer, contentContainerStyle],
    [contentContainerStyle, dynamicStyles.contentContainer],
  );

  const resolvedKeyExtractor = useCallback<
    NonNullable<AppFlatListProps<ItemT>['keyExtractor']>
  >(
    (item, index) => {
      if (keyExtractor) {
        return keyExtractor(item, index);
      }

      const keyCandidate = item as KeyCandidate;

      if (keyCandidate.key !== undefined) {
        return String(keyCandidate.key);
      }

      if (keyCandidate.id !== undefined) {
        return String(keyCandidate.id);
      }

      return `item-${index}`;
    },
    [keyExtractor],
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
    <AppFlatListView
      initialNumToRender={initialNumToRender}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      maxToRenderPerBatch={maxToRenderPerBatch}
      ref={ref}
      removeClippedSubviews={removeClippedSubviews}
      resolvedContentContainerStyle={resolvedContentContainerStyle}
      resolvedKeyExtractor={resolvedKeyExtractor}
      resolvedRefreshControl={resolvedRefreshControl}
      resolvedStyle={resolvedStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      windowSize={windowSize}
      {...restProps}
    />
  );
};

const AppFlatListContainerBase = forwardRef(
  AppFlatListContainerInner,
) ;

AppFlatListContainerBase.displayName = 'AppFlatList';

const AppFlatListContainerComponent = AppFlatListContainerBase as <ItemT>(
  props: AppFlatListProps<ItemT> & {
    ref?: React.ForwardedRef<FlatList<ItemT>>;
  },
) => React.ReactElement | null;

export const AppFlatList = memo(
  AppFlatListContainerComponent,
) as typeof AppFlatListContainerComponent;
