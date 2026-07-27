import React, { memo } from 'react';

import type {
  AccountInformationProps,
  ProfileHeaderProps,
  SettingsGroupProps,
  SettingsItemProps,
  SubscriptionCardProps,
} from './types';
import {
  AccountInformationView,
  ProfileHeaderView,
  SettingsGroupView,
  SettingsItemView,
  SubscriptionCardView,
} from './view';

const ProfileHeaderComponent = (props: ProfileHeaderProps) => <ProfileHeaderView {...props} />;
ProfileHeaderComponent.displayName = 'ProfileHeader';

const SubscriptionCardComponent = (props: SubscriptionCardProps) => (
  <SubscriptionCardView {...props} />
);
SubscriptionCardComponent.displayName = 'SubscriptionCard';

const SettingsItemComponent = (props: SettingsItemProps) => <SettingsItemView {...props} />;
SettingsItemComponent.displayName = 'SettingsItem';

const SettingsGroupComponent = (props: SettingsGroupProps) => <SettingsGroupView {...props} />;
SettingsGroupComponent.displayName = 'SettingsGroup';

const AccountInformationComponent = (props: AccountInformationProps) => (
  <AccountInformationView {...props} />
);
AccountInformationComponent.displayName = 'AccountInformation';

export const ProfileHeader = memo(ProfileHeaderComponent);
export const SubscriptionCard = memo(SubscriptionCardComponent);
export const SettingsItem = memo(SettingsItemComponent);
export const SettingsGroup = memo(SettingsGroupComponent);
export const AccountInformation = memo(AccountInformationComponent);
