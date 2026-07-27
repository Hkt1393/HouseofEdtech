import React, { memo } from 'react';

import { APP_STRINGS } from '../../../constants';
import { AppActivityIndicator, AppText, AppView } from '../../base';
import { Row } from '../../layout';

import type { AppButtonViewProps } from './types';
import { styles } from './styles';

const AppButtonViewComponent = ({
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  backgroundColorToken,
  borderColorToken,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'leading',
  label,
  labelColorToken,
  loading = false,
  minHeight,
  onPress,
  resolvedAccessibilityHint,
  resolvedAccessibilityState,
  resolvedStyle,
  sizeValue,
}: AppButtonViewProps) => {
  const shouldRenderLeadingIcon = Boolean(icon) && iconPosition === 'leading';
  const shouldRenderTrailingIcon = Boolean(icon) && iconPosition === 'trailing';

  return (
    <AppView
      accessibilityHint={accessibilityHint ?? resolvedAccessibilityHint}
      accessibilityLabel={
        accessibilityLabel ??
        label ??
        APP_STRINGS.components.button.loadingAccessibilityLabel
      }
      accessibilityRole="button"
      accessibilityState={accessibilityState ?? resolvedAccessibilityState}
      alignItems="center"
      backgroundColorToken={backgroundColorToken}
      borderColorToken={borderColorToken}
      borderWidth={borderColorToken ? 1 : 0}
      center
      disabled={disabled || loading}
      justifyContent="center"
      onPress={onPress}
      paddingHorizontal="lg"
      radius="full"
      style={[resolvedStyle, fullWidth ? styles.fullWidth : null]}
    >
      <Row gap="sm" justifyContent="center">
        {loading ? (
          <AppActivityIndicator colorToken={labelColorToken} size="small" />
        ) : null}
        {!loading && shouldRenderLeadingIcon ? icon : null}
        {label ? (
          <AppText colorToken={labelColorToken} variant="label">
            {label}
          </AppText>
        ) : null}
        {!loading && shouldRenderTrailingIcon ? icon : null}
      </Row>
    </AppView>
  );
};

AppButtonViewComponent.displayName = 'AppButtonView';

export const AppButtonView = memo(AppButtonViewComponent);
