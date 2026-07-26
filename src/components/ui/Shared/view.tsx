import React, { memo } from 'react';

import { AppScrollView, AppText, AppView } from '../../base';
import { EmptyView } from '../../feedback/StateView';
import { Card, Divider, Row, Stack } from '../../layout';
import { GenreChip, LabelValueRow, Rating } from '../ContentPrimitives';
import { PrimaryButton } from '../AppButton';

import { styles } from './styles';
import type {
  DividerRowProps,
  EmptyLibraryProps,
  GenreChipGroupViewProps,
  GenreListViewProps,
  InformationRowProps,
  MetadataRowViewProps,
  NoInternetBannerProps,
  RatingRowProps,
} from './types';

const GenreListViewComponent = ({ renderedGenres }: GenreListViewProps) => {
  return (
    <AppScrollView horizontal contentGap="sm" showsHorizontalScrollIndicator={false}>
      {renderedGenres}
    </AppScrollView>
  );
};

GenreListViewComponent.displayName = 'GenreListView';

const GenreChipGroupViewComponent = ({ renderedItems }: GenreChipGroupViewProps) => {
  return (
    <AppView row gap="sm" style={styles.chipGroup} wrap="wrap">
      {renderedItems}
    </AppView>
  );
};

GenreChipGroupViewComponent.displayName = 'GenreChipGroupView';

const RatingRowViewComponent = ({
  caption,
  label,
  tone = 'warning',
  trailingAccessory,
  value,
}: RatingRowProps) => {
  return (
    <Row alignItems="center" gap="sm" style={styles.row}>
      {label ? (
        <AppText colorToken="textSecondary" variant="caption">
          {label}
        </AppText>
      ) : null}
      <Rating caption={caption} tone={tone} value={value} />
      <AppView flex />
      {trailingAccessory}
    </Row>
  );
};

RatingRowViewComponent.displayName = 'RatingRowView';

const MetadataRowViewComponent = ({ renderedItems, wrap = true }: MetadataRowViewProps) => {
  return (
    <AppView row gap="sm" style={styles.metadataRow} wrap={wrap ? 'wrap' : 'nowrap'}>
      {renderedItems}
    </AppView>
  );
};

MetadataRowViewComponent.displayName = 'MetadataRowView';

const InformationRowViewComponent = ({
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  description,
  label,
  leadingAccessory,
  onPress,
  trailingAccessory,
  value,
}: InformationRowProps) => {
  return (
    <Card
      accessibilityHint={onPress ? accessibilityHint : undefined}
      accessibilityLabel={accessibilityLabel ?? value}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={accessibilityState}
      bordered={false}
      gap="md"
      onPress={onPress}
      padding="md"
      variant="secondary"
    >
      <Row alignItems="center" gap="md">
        {leadingAccessory}
        <AppView flex>
          <LabelValueRow
            description={description}
            label={label}
            trailingAccessory={trailingAccessory}
            value={value}
          />
        </AppView>
      </Row>
    </Card>
  );
};

InformationRowViewComponent.displayName = 'InformationRowView';

const DividerRowViewComponent = ({ label, trailingAccessory }: DividerRowProps) => {
  return (
    <Row alignItems="center" gap="sm" style={styles.row}>
      <Divider style={styles.divider} />
      {label ? (
        <AppText colorToken="textTertiary" variant="caption">
          {label}
        </AppText>
      ) : null}
      {trailingAccessory}
      <Divider style={styles.divider} />
    </Row>
  );
};

DividerRowViewComponent.displayName = 'DividerRowView';

const EmptyLibraryViewComponent = ({
  actionLabel,
  description,
  illustration,
  onAction,
  title,
}: EmptyLibraryProps) => {
  return (
    <EmptyView
      actionLabel={actionLabel}
      description={description}
      illustration={illustration}
      onAction={onAction}
      title={title}
    />
  );
};

EmptyLibraryViewComponent.displayName = 'EmptyLibraryView';

const NoInternetBannerViewComponent = ({
  actionLabel,
  description,
  icon,
  onAction,
  title,
}: NoInternetBannerProps) => {
  return (
    <Card bordered={false} gap="md" padding="lg" radius="md" variant="overlay">
      <Row alignItems="center" gap="md">
        {icon}
        <Stack flex gap="xs">
          <AppText colorToken="textInverse" variant="label">
            {title}
          </AppText>
          {description ? (
            <AppText colorToken="textInverse" variant="caption">
              {description}
            </AppText>
          ) : null}
        </Stack>
      </Row>
      {actionLabel && onAction ? <PrimaryButton label={actionLabel} onPress={onAction} /> : null}
    </Card>
  );
};

NoInternetBannerViewComponent.displayName = 'NoInternetBannerView';

export const GenreListView = memo(GenreListViewComponent);
export const GenreChipGroupView = memo(GenreChipGroupViewComponent);
export const RatingRowView = memo(RatingRowViewComponent);
export const MetadataRowView = memo(MetadataRowViewComponent);
export const InformationRowView = memo(InformationRowViewComponent);
export const DividerRowView = memo(DividerRowViewComponent);
export const EmptyLibraryView = memo(EmptyLibraryViewComponent);
export const NoInternetBannerView = memo(NoInternetBannerViewComponent);
