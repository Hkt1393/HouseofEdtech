import React, { memo } from 'react';

import { AppText, AppView } from '../../base';

import { Stack } from '../Stack';

import { styles } from './styles';
import type { SectionViewProps } from './types';

const SectionViewComponent = ({
  actionLabel,
  children,
  footer,
  headerAccessory,
  onActionPress,
  resolvedHeaderStyle,
  resolvedStyle,
  subtitle,
  title,
  ...restProps
}: SectionViewProps) => {
  const shouldRenderHeader = Boolean(title || subtitle || actionLabel || headerAccessory);

  return (
    <AppView style={resolvedStyle} {...restProps}>
      {shouldRenderHeader ? (
        <AppView row gap="md" style={resolvedHeaderStyle}>
          <Stack gap="xs" style={styles.titleGroup}>
            {title ? <AppText variant="title">{title}</AppText> : null}
            {subtitle ? (
              <AppText colorToken="textSecondary" style={styles.subtitle}>
                {subtitle}
              </AppText>
            ) : null}
          </Stack>
          {headerAccessory}
          {actionLabel && onActionPress ? (
            <AppView
              accessibilityRole="button"
              onPress={onActionPress}
              paddingVertical="xs"
              style={styles.action}
            >
              <AppText colorToken="primary" variant="label">
                {actionLabel}
              </AppText>
            </AppView>
          ) : null}
        </AppView>
      ) : null}
      {children}
      {footer}
    </AppView>
  );
};

SectionViewComponent.displayName = 'SectionView';

export const SectionView = memo(SectionViewComponent);
