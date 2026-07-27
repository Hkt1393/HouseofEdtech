/**
 * Public props for feature-level profile components.
 */

import type { ReactNode } from 'react';

import type { InformationRowItem } from '../Shared';

export interface ProfileHeaderProps {
  accessory?: ReactNode;
  avatarLabel?: string;
  avatarUrl?: string | null;
  footer?: ReactNode;
  name: string;
  onPress?: () => void;
  planLabel?: string;
  subtitle?: string;
}

export interface SubscriptionCardProps {
  actionLabel?: string;
  badgeLabel?: string;
  description: string;
  metaLabel?: string;
  onAction?: () => void;
  title: string;
}

export interface SettingsItemProps extends InformationRowItem {}

export interface SettingsGroupProps {
  actionLabel?: string;
  items: readonly SettingsItemProps[];
  onActionPress?: () => void;
  subtitle?: string;
  title?: string;
}

export interface AccountInformationProps {
  items: readonly InformationRowItem[];
  title?: string;
}
