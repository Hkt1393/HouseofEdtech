import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { APP_CONFIG, APP_STRINGS, ROUTES } from '../../constants';
import {
  downloadRepository,
  profileRepository,
  settingsRepository,
} from '../../services';
import { useTheme } from '../../theme';
import type {
  DownloadsOverview,
  MainTabScreenProps,
  UserProfile,
} from '../../types';

import { ProfileView } from './view';

interface ScreenErrorState {
  readonly description: string;
  readonly title: string;
}

export interface ProfileScreenContent {
  readonly avatarUrl: string | null;
  readonly downloadStorageLabel: string;
  readonly email: string;
  readonly footerLabel: string;
  readonly languageLabel: string;
  readonly membershipDescription: string;
  readonly membershipRenewalLabel: string;
  readonly membershipTitle: string;
  readonly name: string;
  readonly planLabel: string;
}

const renewalDateFormatter = new Intl.DateTimeFormat(APP_CONFIG.defaultLocale, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const formatDownloadStorageLabel = (usedBytes: number): string => {
  const usedGigabytes = usedBytes / 1_000_000_000;

  return `${usedGigabytes.toFixed(1)} ${APP_STRINGS.profile.downloadsStorageValueSuffix}`;
};

const buildErrorState = (message?: string, code?: string): ScreenErrorState => {
  if (code === 'TMDB_CONFIGURATION_ERROR' || code === 'TMDB_AUTHENTICATION_ERROR') {
    return {
      description: message ?? APP_STRINGS.errors.tmdbConfigurationDescription,
      title: APP_STRINGS.errors.configurationTitle,
    };
  }

  if (code === 'NETWORK_UNAVAILABLE') {
    return {
      description: APP_STRINGS.errors.networkDescription,
      title: APP_STRINGS.errors.networkTitle,
    };
  }

  return {
    description: message ?? APP_STRINGS.errors.genericDescription,
    title: APP_STRINGS.errors.genericTitle,
  };
};

const buildMembershipRenewalLabel = (profile: UserProfile): string => {
  if (!profile.subscription.renewsAt) {
    return APP_STRINGS.common.notAvailable.toUpperCase();
  }

  return `${APP_STRINGS.profile.premiumRenewsPrefix} ${renewalDateFormatter
    .format(new Date(profile.subscription.renewsAt))
    .toUpperCase()}`;
};

const buildProfileContent = (
  profile: UserProfile,
  downloadsOverview: DownloadsOverview,
): ProfileScreenContent => ({
  avatarUrl: profile.avatarUrl,
  downloadStorageLabel: formatDownloadStorageLabel(
    downloadsOverview.storageInfo.usedBytes,
  ),
  email: profile.email,
  footerLabel: `${APP_STRINGS.profile.appFooterTitle} v${APP_CONFIG.marketingVersion} ${APP_STRINGS.profile.footerDivider} ${APP_STRINGS.profile.appFooterSuffix}`,
  languageLabel: profile.preferredLanguage,
  membershipDescription: APP_STRINGS.profile.membershipDescription,
  membershipRenewalLabel: buildMembershipRenewalLabel(profile),
  membershipTitle: APP_STRINGS.profile.membershipTitle,
  name: profile.fullName,
  planLabel: APP_STRINGS.profile.badgeLabel,
});

const ProfileContainerComponent = ({
  navigation,
}: MainTabScreenProps<typeof ROUTES.PROFILE>) => {
  const isMountedRef = useRef(true);
  const contentRef = useRef<ProfileScreenContent | null>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const { resolvedThemeMode, setThemeMode, spacing, themeMode } = useTheme();

  const [content, setContent] = useState<ProfileScreenContent | null>(null);
  const [errorState, setErrorState] = useState<ScreenErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedThemeMode = useMemo<'dark' | 'light'>(
    () => (themeMode === 'system' ? resolvedThemeMode : themeMode),
    [resolvedThemeMode, themeMode],
  );

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  const loadProfile = useCallback(
    async (isPullToRefresh: boolean = false) => {
      if (isPullToRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const [profileResponse, downloadsResponse] = await Promise.all([
        profileRepository.getProfile(),
        downloadRepository.getDownloads(),
      ]);

      if (!isMountedRef.current) {
        return;
      }

      if (!profileResponse.success) {
        if (!contentRef.current) {
          setErrorState(
            buildErrorState(
              profileResponse.error?.message ?? profileResponse.message,
              profileResponse.error?.code,
            ),
          );
        }

        setIsLoading(false);
        setIsRefreshing(false);

        return;
      }

      if (!downloadsResponse.success) {
        if (!contentRef.current) {
          setErrorState(
            buildErrorState(
              downloadsResponse.error?.message ?? downloadsResponse.message,
              downloadsResponse.error?.code,
            ),
          );
        }

        setIsLoading(false);
        setIsRefreshing(false);

        return;
      }

      if (!profileResponse.data || !downloadsResponse.data) {
        setContent(null);
        setErrorState(null);
        setIsLoading(false);
        setIsRefreshing(false);

        return;
      }

      setContent(buildProfileContent(profileResponse.data, downloadsResponse.data));
      setErrorState(null);
      setIsLoading(false);
      setIsRefreshing(false);
    },
    [],
  );

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const handleOpenSettings = useCallback(() => {
    navigation.navigate(ROUTES.SETTINGS);
  }, [navigation]);

  const handleLogout = useCallback(() => {
    navigation.navigate(ROUTES.AUTH, {
      screen: ROUTES.LOGIN,
    });
  }, [navigation]);

  const handleRefresh = useCallback(() => {
    void loadProfile(true);
  }, [loadProfile]);

  const handleRetry = useCallback(() => {
    void loadProfile();
  }, [loadProfile]);

  const handleThemeModeChange = useCallback(
    (nextThemeMode: 'dark' | 'light') => {
      if (themeMode === nextThemeMode) {
        return;
      }

      setThemeMode(nextThemeMode);
      void settingsRepository.updateTheme(nextThemeMode);
    },
    [setThemeMode, themeMode],
  );

  const contentBottomInset = useMemo(
    () => tabBarHeight + spacing['3xl'],
    [spacing, tabBarHeight],
  );

  return (
    <ProfileView
      content={content}
      contentBottomInset={contentBottomInset}
      errorState={errorState}
      isEmpty={!isLoading && !errorState && !content}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      onDownloadsPress={handleOpenSettings}
      onLanguagePress={handleOpenSettings}
      onLogoutPress={handleLogout}
      onManagePress={handleOpenSettings}
      onMenuPress={handleOpenSettings}
      onNotificationsPress={handleOpenSettings}
      onRefresh={handleRefresh}
      onRetry={handleRetry}
      onThemeModeChange={handleThemeModeChange}
      onWatchHistoryPress={handleOpenSettings}
      selectedThemeMode={selectedThemeMode}
    />
  );
};

ProfileContainerComponent.displayName = 'ProfileContainer';

export const ProfileContainer = memo(ProfileContainerComponent);
