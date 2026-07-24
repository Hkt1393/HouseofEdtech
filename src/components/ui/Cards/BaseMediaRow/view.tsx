import React, { memo } from 'react';

import { Row, Card, Stack } from '../../../layout';

import { styles } from './styles';
import type { BaseMediaRowViewProps } from './types';

const BaseMediaRowViewComponent = ({
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  content,
  media,
  onPress,
  trailingAccessory,
}: BaseMediaRowViewProps) => {
  return (
    <Card
      accessibilityHint={onPress ? accessibilityHint : undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={accessibilityState}
      bordered={false}
      gap="md"
      onPress={onPress}
      padding="md"
    >
      <Row gap="md">
        {media}
        <Stack flex gap="xs" style={styles.grow}>
          {content}
        </Stack>
        {trailingAccessory}
      </Row>
    </Card>
  );
};

BaseMediaRowViewComponent.displayName = 'BaseMediaRowView';

export const BaseMediaRowView = memo(BaseMediaRowViewComponent);
