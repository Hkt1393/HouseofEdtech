import React, { memo } from 'react';

import { AppText, AppView } from '../../base';
import { Card, Row, Stack } from '../../layout';
import { Badge, ProgressBar } from '../ContentPrimitives';
import { PrimaryButton } from '../AppButton';
import { MetadataRow } from '../Shared';

import { styles } from './styles';
import type {
  DownloadProgressProps,
  DownloadStatusProps,
  StorageCardProps,
  StorageSegment,
} from './types';

const DownloadStatusViewComponent = ({ label, tone = 'info' }: DownloadStatusProps) => {
  return <Badge label={label} tone={tone} />;
};

DownloadStatusViewComponent.displayName = 'DownloadStatusView';

const DownloadProgressViewComponent = ({
  label,
  progress,
  subtitle,
  trailingLabel,
}: DownloadProgressProps) => {
  return (
    <Stack gap="xs">
      {label ? <AppText variant="label">{label}</AppText> : null}
      {subtitle || trailingLabel ? (
        <Row alignItems="center" gap="sm" justifyContent="space-between">
          {subtitle ? (
            <AppText colorToken="textSecondary" variant="caption">
              {subtitle}
            </AppText>
          ) : null}
          {trailingLabel ? (
            <AppText colorToken="textTertiary" variant="caption">
              {trailingLabel}
            </AppText>
          ) : null}
        </Row>
      ) : null}
      <ProgressBar progress={progress} showLabel />
    </Stack>
  );
};

DownloadProgressViewComponent.displayName = 'DownloadProgressView';

const StorageCardViewComponent = ({
  actionLabel,
  availableLabel,
  onAction,
  segments,
  title,
  usedLabel,
}: StorageCardProps) => {
  return (
    <Card bordered={false} gap="md" padding="lg" variant="secondary">
      <Row alignItems="center" gap="md" justifyContent="space-between">
        <Stack gap="xs">
          <AppText variant="label">{title}</AppText>
          {usedLabel ? <AppText colorToken="textSecondary">{usedLabel}</AppText> : null}
        </Stack>
        {availableLabel ? (
          <AppText colorToken="primary" variant="caption">
            {availableLabel}
          </AppText>
        ) : null}
      </Row>
      <Row backgroundColorToken="surfaceSecondary" gap="xs" radius="full" style={styles.segmentBar}>
        {segments.map((segment: StorageSegment) => (
          <AppView
            backgroundColorToken={segment.tone === 'warning' ? 'warning' : segment.tone === 'info' ? 'info' : segment.tone === 'success' ? 'success' : 'primary'}
            flex={segment.value}
            key={segment.id}
            paddingVertical="xs"
          />
        ))}
      </Row>
      <MetadataRow
        items={segments.map((segment) => ({
          id: segment.id,
          label: segment.label,
          tone: segment.tone,
          variant: 'soft',
        }))}
      />
      {actionLabel && onAction ? <PrimaryButton label={actionLabel} onPress={onAction} /> : null}
    </Card>
  );
};

StorageCardViewComponent.displayName = 'StorageCardView';

export const DownloadStatusView = memo(DownloadStatusViewComponent);
export const DownloadProgressView = memo(DownloadProgressViewComponent);
export const StorageCardView = memo(StorageCardViewComponent);
