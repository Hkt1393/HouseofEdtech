import React, { memo, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppText, AppView } from '../../components/base';
import { Center, Container, Screen, Stack } from '../../components/layout';
import { PrimaryButton, SecondaryButton } from '../../components/ui';
import { AppIcon } from '../../components/ui/shared';
import { APP_STRINGS } from '../../constants';
import { useTheme } from '../../theme';
import { moderateScale } from '../../utils';

import { createDynamicStyles } from './styles';

interface SettingsViewProps {
  readonly onBackToHome: () => void;
  readonly onGoBack: () => void;
}

const SettingsViewComponent = ({
  onBackToHome,
  onGoBack,
}: SettingsViewProps) => {
  const theme = useTheme();
  const { colors, isDark } = theme;
  const dynamicStyles = useMemo(
    () => createDynamicStyles(theme),
    [theme],
  );
  const statusBarStyle = useMemo(() => (isDark ? 'light' : 'dark'), [isDark]);

  return (
    <Screen backgroundColorToken="background" safeAreaEdges={['top', 'bottom']}>
      <StatusBar style={statusBarStyle} />
      <Center flex>
        <Container maxWidth={480}>
          <AppView
            backgroundColorToken={isDark ? 'surfaceLow' : 'surfaceLowest'}
            borderColorToken="divider"
            borderWidth={1}
            padding="xl"
            radius="lg"
            shadow="sm"
            style={dynamicStyles.surfaceCard}
          >
            <Stack gap="xl">
              <AppView style={dynamicStyles.iconHalo}>
                <AppView
                  alignItems="center"
                  backgroundColorToken="primaryContainer"
                  center
                  radius="full"
                  style={dynamicStyles.iconCore}
                >
                  <AppIcon
                    color={colors.onPrimaryContainer}
                    name="settings"
                    size={moderateScale(34)}
                  />
                </AppView>
              </AppView>
              <Stack gap="sm" style={dynamicStyles.copyBlock}>
                <AppText align="center" style={dynamicStyles.titleText}>
                  {APP_STRINGS.settings.placeholderTitle}
                </AppText>
                <AppText align="center" colorToken="primary" style={dynamicStyles.subtitleText}>
                  {APP_STRINGS.settings.comingSoonSubtitle}
                </AppText>
                <AppText
                  align="center"
                  colorToken="textSecondary"
                  style={dynamicStyles.descriptionText}
                >
                  {APP_STRINGS.settings.comingSoonDescription}
                </AppText>
              </Stack>
              <Stack gap="md">
                <PrimaryButton
                  accessibilityHint={APP_STRINGS.components.button.primaryAccessibilityHint}
                  accessibilityLabel={APP_STRINGS.settings.goBack}
                  fullWidth
                  label={APP_STRINGS.settings.goBack}
                  onPress={onGoBack}
                />
                <SecondaryButton
                  accessibilityHint={APP_STRINGS.components.button.secondaryAccessibilityHint}
                  accessibilityLabel={APP_STRINGS.settings.backToHome}
                  fullWidth
                  label={APP_STRINGS.settings.backToHome}
                  onPress={onBackToHome}
                />
              </Stack>
            </Stack>
          </AppView>
        </Container>
      </Center>
    </Screen>
  );
};

SettingsViewComponent.displayName = 'SettingsView';

export const SettingsView = memo(SettingsViewComponent);
