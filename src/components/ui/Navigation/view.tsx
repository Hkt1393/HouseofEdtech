import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

import { APP_STRINGS } from '../../../constants';
import { AppText, AppTextInput } from '../../base';
import { Badge } from '../ContentPrimitives';
import { IconButton } from '../AppButton';

import { Row, Stack } from '../../layout';

import { styles } from './styles';
import type {
  BackButtonProps,
  BottomTabBarProps,
  BottomTabItemProps,
  HeaderProps,
  SearchBarProps,
  TabBarBackgroundProps,
} from './types';

const BackButtonViewComponent = ({
  accessibilityHint = APP_STRINGS.components.navigation.backButtonAccessibilityHint,
  accessibilityLabel = APP_STRINGS.components.navigation.backButtonAccessibilityLabel,
  icon,
  onPress,
}: BackButtonProps & { icon: React.ReactNode }) => {
  return (
    <IconButton
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      icon={icon}
      onPress={onPress}
    />
  );
};

BackButtonViewComponent.displayName = 'BackButtonView';

const HeaderViewComponent = ({
  leadingAccessory,
  subtitle,
  title,
  trailingAccessory,
}: HeaderProps) => {
  return (
    <Row alignItems="center" gap="md" justifyContent="space-between" >
      {leadingAccessory}
      <Stack flex gap="xs" style={styles.grow}>
        <AppText numberOfLines={1} variant="title">
          {title}
        </AppText>
        {subtitle ? (
          <AppText colorToken="textSecondary" numberOfLines={2} variant="caption">
            {subtitle}
          </AppText>
        ) : null}
      </Stack>
      {trailingAccessory}
    </Row>
  );
};

HeaderViewComponent.displayName = 'HeaderView';

const SearchBarViewComponent = ({
  clearIcon,
  onClear,
  searchIcon,
  value,
  ...restProps
}: SearchBarProps & { clearIcon: React.ReactNode; searchIcon: React.ReactNode }) => {
  return (
    <AppTextInput
      accessibilityHint={
        restProps.accessibilityHint ??
        APP_STRINGS.components.navigation.searchBarAccessibilityHint
      }
      accessibilityLabel={
        restProps.accessibilityLabel ??
        APP_STRINGS.components.navigation.searchBarAccessibilityLabel
      }
      accessibilityRole="search"
      leadingIcon={searchIcon}
      onTrailingActionPress={onClear}
      placeholder={APP_STRINGS.components.navigation.searchPlaceholder}
      showCharacterCounter={false}
      trailingIcon={value ? clearIcon : undefined}
      {...restProps}
      onChangeText={restProps.onChangeText}
      trailingActionAccessibilityHint={APP_STRINGS.components.navigation.clearSearchAccessibilityHint}
      trailingActionAccessibilityLabel={APP_STRINGS.components.navigation.clearSearchAccessibilityLabel}
      trailingIconPressable={Boolean(value && onClear)}
    />
  );
};

SearchBarViewComponent.displayName = 'SearchBarView';

const BottomTabItemViewComponent = ({
  accessibilityHint = APP_STRINGS.components.navigation.bottomTabAccessibilityHint,
  active = false,
  accessibilityLabel,
  accessibilityState,
  badgeLabel,
  icon,
  iconContainerStyle,
  indicatorStyle,
  label,
  labelStyle,
  onLongPress,
  onPress,
  pressableStyle,
  showActiveIndicator = true,
  showLabel = false,
  testID,
}: BottomTabItemProps) => {
  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="tab"
      accessibilityState={{
        selected: active,
        ...accessibilityState,
      }}
      className="flex-1 items-center justify-center"
      onLongPress={onLongPress}
      onPress={onPress}
      style={[styles.tabItemPressable, styles.tabItem, pressableStyle]}
      testID={testID}
    >
      <View
        className="items-center justify-center rounded-full"
        style={[styles.tabItemSurface, iconContainerStyle]}
      >
        {icon}
      </View>
      {showLabel ? (
        <AppText style={[styles.tabItemLabel, labelStyle]} variant="caption">
          {label}
        </AppText>
      ) : null}
      {active && showActiveIndicator ? (
        <View className="rounded-full" style={[styles.tabItemIndicator, indicatorStyle]} />
      ) : null}
      {badgeLabel ? <Badge label={badgeLabel} tone="primary" variant="solid" /> : null}
    </Pressable>
  );
};

BottomTabItemViewComponent.displayName = 'BottomTabItemView';

const TabBarBackgroundViewComponent = ({
  children,
  maxWidth,
  shellStyle,
  style,
}: TabBarBackgroundProps) => {
  return (
    <View
      className="w-full"
      style={style}
    >
      <View
        className="w-full"
        style={[styles.floatingTabBarShell, shellStyle, maxWidth ? { maxWidth } : null]}
      >
        {children}
      </View>
    </View>
  );
};

TabBarBackgroundViewComponent.displayName = 'TabBarBackgroundView';

const BottomTabBarViewComponent = ({
  bottomInset,
  horizontalInset,
  items,
  maxWidth,
  shellStyle,
  style,
}: BottomTabBarProps) => {
  return (
    <TabBarBackgroundView
      bottomInset={bottomInset}
      horizontalInset={horizontalInset}
      maxWidth={maxWidth}
      shellStyle={shellStyle}
      style={style}
    >
      <View className="flex-row items-center justify-between" style={styles.floatingTabBarContent}>
        {items.map((item) => (
          <BottomTabItemView key={item.testID ?? item.label} {...item} />
        ))}
      </View>
    </TabBarBackgroundView>
  );
};

BottomTabBarViewComponent.displayName = 'BottomTabBarView';

export const BackButtonView = memo(BackButtonViewComponent);
export const HeaderView = memo(HeaderViewComponent);
export const SearchBarView = memo(SearchBarViewComponent);
export const BottomTabItemView = memo(BottomTabItemViewComponent);
export const TabBarBackgroundView = memo(TabBarBackgroundViewComponent);
export const BottomTabBarView = memo(BottomTabBarViewComponent);
