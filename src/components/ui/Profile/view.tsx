import React, { memo } from 'react';

import { AppText } from '../../base';
import { Card, Row, Section, Stack } from '../../layout';
import { Avatar, Badge } from '../ContentPrimitives';
import { PrimaryButton } from '../AppButton';
import { InformationRow } from '../Shared';

import { styles } from './styles';
import type {
  AccountInformationProps,
  ProfileHeaderProps,
  SettingsGroupProps,
  SettingsItemProps,
  SubscriptionCardProps,
} from './types';

const ProfileHeaderViewComponent = ({
  accessory,
  avatarLabel,
  avatarUrl,
  footer,
  name,
  onPress,
  planLabel,
  subtitle,
}: ProfileHeaderProps) => {
  return (
    <Card
      accessibilityLabel={name}
      accessibilityRole={onPress ? 'button' : undefined}
      bordered={false}
      gap="md"
      onPress={onPress}
      padding="lg"
      variant="secondary"
    >
      <Row alignItems="center" gap="md">
        <Avatar fallbackLabel={avatarLabel ?? name} imageUrl={avatarUrl} size="xl" />
        <Stack flex gap="xs">
          {planLabel ? <Badge label={planLabel} tone="primary" /> : null}
          <AppText variant="title">{name}</AppText>
          {subtitle ? <AppText colorToken="textSecondary">{subtitle}</AppText> : null}
        </Stack>
        {accessory}
      </Row>
      {footer}
    </Card>
  );
};

ProfileHeaderViewComponent.displayName = 'ProfileHeaderView';

const SubscriptionCardViewComponent = ({
  actionLabel,
  badgeLabel,
  description,
  metaLabel,
  onAction,
  title,
}: SubscriptionCardProps) => {
  return (
    <Card bordered={false} gap="md" padding="lg" variant="overlay">
      <Stack gap="xs">
        {badgeLabel ? <Badge label={badgeLabel} tone="warning" /> : null}
        <AppText colorToken="textInverse" variant="title">
          {title}
        </AppText>
        <AppText colorToken="textInverse">{description}</AppText>
        {metaLabel ? (
          <AppText colorToken="textInverse" variant="caption">
            {metaLabel}
          </AppText>
        ) : null}
      </Stack>
      {actionLabel && onAction ? <PrimaryButton label={actionLabel} onPress={onAction} /> : null}
    </Card>
  );
};

SubscriptionCardViewComponent.displayName = 'SubscriptionCardView';

const SettingsItemViewComponent = (props: SettingsItemProps) => {
  return <InformationRow {...props} />;
};

SettingsItemViewComponent.displayName = 'SettingsItemView';

const SettingsGroupViewComponent = ({
  actionLabel,
  items,
  onActionPress,
  subtitle,
  title,
}: SettingsGroupProps) => {
  return (
    <Section actionLabel={actionLabel} onActionPress={onActionPress} subtitle={subtitle} title={title}>
      <Stack gap="sm" style={styles.group}>
        {items.map((item) => (
          <InformationRow {...item} key={item.id} />
        ))}
      </Stack>
    </Section>
  );
};

SettingsGroupViewComponent.displayName = 'SettingsGroupView';

const AccountInformationViewComponent = ({ items, title }: AccountInformationProps) => {
  return (
    <Section title={title}>
      <Stack gap="sm" style={styles.group}>
        {items.map((item) => (
          <InformationRow {...item} key={item.id} />
        ))}
      </Stack>
    </Section>
  );
};

AccountInformationViewComponent.displayName = 'AccountInformationView';

export const ProfileHeaderView = memo(ProfileHeaderViewComponent);
export const SubscriptionCardView = memo(SubscriptionCardViewComponent);
export const SettingsItemView = memo(SettingsItemViewComponent);
export const SettingsGroupView = memo(SettingsGroupViewComponent);
export const AccountInformationView = memo(AccountInformationViewComponent);
