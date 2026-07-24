import React, { memo, useMemo } from 'react';

import { useTheme } from '../../../theme';
import { moderateScale } from '../../../utils';

import { AppIcon } from '../shared';

import {
  BackButtonView,
  BottomTabItemView,
  HeaderView,
  SearchBarView,
  TabBarBackgroundView,
} from './view';
import type {
  BackButtonProps,
  BottomTabItemProps,
  HeaderProps,
  SearchBarProps,
  TabBarBackgroundProps,
} from './types';

const BackButtonComponent = (props: BackButtonProps) => {
  const { colors } = useTheme();

  const icon = useMemo(
    () => (
      <AppIcon
        color={colors.textPrimary}
        name="arrow-left"
        size={moderateScale(18)}
      />
    ),
    [colors.textPrimary],
  );

  return <BackButtonView icon={icon} {...props} />;
};

BackButtonComponent.displayName = 'BackButton';

const HeaderComponent = ({ leadingAccessory, onBackPress, ...restProps }: HeaderProps) => {
  const resolvedLeadingAccessory = useMemo(
    () => leadingAccessory ?? (onBackPress ? <BackButtonComponent onPress={onBackPress} /> : null),
    [leadingAccessory, onBackPress],
  );

  return <HeaderView leadingAccessory={resolvedLeadingAccessory} {...restProps} />;
};

HeaderComponent.displayName = 'Header';

const SearchBarComponent = (props: SearchBarProps) => {
  const { colors } = useTheme();

  const clearIcon = useMemo(
    () => (
      <AppIcon
        color={colors.iconSecondary}
        name="close"
        size={moderateScale(16)}
      />
    ),
    [colors.iconSecondary],
  );

  const searchIcon = useMemo(
    () => (
      <AppIcon
        color={colors.iconSecondary}
        name="search"
        size={moderateScale(16)}
      />
    ),
    [colors.iconSecondary],
  );

  return <SearchBarView clearIcon={clearIcon} searchIcon={searchIcon} {...props} />;
};

SearchBarComponent.displayName = 'SearchBar';

const BottomTabItemComponent = (props: BottomTabItemProps) => {
  return <BottomTabItemView {...props} />;
};

BottomTabItemComponent.displayName = 'BottomTabItem';

const TabBarBackgroundComponent = (props: TabBarBackgroundProps) => {
  return <TabBarBackgroundView {...props} />;
};

TabBarBackgroundComponent.displayName = 'TabBarBackground';

export const BackButton = memo(BackButtonComponent);
export const Header = memo(HeaderComponent);
export const SearchBar = memo(SearchBarComponent);
export const BottomTabItem = memo(BottomTabItemComponent);
export const TabBarBackground = memo(TabBarBackgroundComponent);
