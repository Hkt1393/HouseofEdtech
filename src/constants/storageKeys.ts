/**
 * Centralized persistent storage keys.
 */

import { APP_NAMESPACE } from './app';

const STORAGE_PREFIX = `${APP_NAMESPACE}/storage`;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: `${STORAGE_PREFIX}/auth/access-token`,
  REFRESH_TOKEN: `${STORAGE_PREFIX}/auth/refresh-token`,
  USER_PROFILE: `${STORAGE_PREFIX}/profile/user`,
  APP_THEME: `${STORAGE_PREFIX}/preferences/theme`,
  LANGUAGE: `${STORAGE_PREFIX}/preferences/language`,
  DOWNLOADS: `${STORAGE_PREFIX}/media/downloads`,
  WATCH_HISTORY: `${STORAGE_PREFIX}/media/watch-history`,
  SEARCH_HISTORY: `${STORAGE_PREFIX}/search/history`,
  ONBOARDING: `${STORAGE_PREFIX}/app/onboarding`,
} as const;
