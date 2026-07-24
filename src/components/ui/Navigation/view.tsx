import React, { memo } from 'react';

import { APP_STRINGS } from '../../../constants';
import { AppText, AppTextInput, AppView } from '../../base';
import { Badge } from '../ContentPrimitives';
import { IconButton } from '../AppButton';

import { SafeAreaContainer, Row, Stack } from '../../layout';

import { styles } from './styles';
import type {
  BackButtonProps,
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
    <Row alignItems="center" gap="md" justifyContent="space-between">
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
  label,
  onPress,
}: BottomTabItemProps) => {
  return (
    <AppView
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{
        selected: active,
        ...accessibilityState,
      }}
      alignItems="center"
      backgroundColorToken={active ? 'primaryContainer' : 'transparent'}
      center
      gap="xs"
      onPress={onPress}
      paddingHorizontal="md"
      paddingVertical="sm"
      radius="full"
      style={styles.tabItem}
    >
      {icon}
      <AppText colorToken={active ? 'onPrimaryContainer' : 'textSecondary'} variant="caption">
        {label}
      </AppText>
      {badgeLabel ? <Badge label={badgeLabel} tone="primary" variant="solid" /> : null}
    </AppView>
  );
};

BottomTabItemViewComponent.displayName = 'BottomTabItemView';

const TabBarBackgroundViewComponent = ({
  children,
  style,
}: TabBarBackgroundProps) => {
  return (
    <SafeAreaContainer
      backgroundColorToken="navigationBackground"
      borderColorToken="divider"
      borderWidth={1}
      edges={['bottom']}
      paddingHorizontal="md"
      paddingTop="sm"
      style={style}
    >
      {children}
    </SafeAreaContainer>
  );
};

TabBarBackgroundViewComponent.displayName = 'TabBarBackgroundView';

export const BackButtonView = memo(BackButtonViewComponent);
export const HeaderView = memo(HeaderViewComponent);
export const SearchBarView = memo(SearchBarViewComponent);
export const BottomTabItemView = memo(BottomTabItemViewComponent);
export const TabBarBackgroundView = memo(TabBarBackgroundViewComponent);
