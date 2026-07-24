/**
 * User profile and personalization contracts used by account surfaces.
 */

import { MediaType } from './common';

import type { ID, Nullable, ThemePreference, Timestamp } from './common';

/**
 * Supported subscription plan families.
 */
export enum SubscriptionType {
  Basic = 'basic',
  Standard = 'standard',
  Premium = 'premium',
}

/**
 * Subscription metadata associated with the signed-in user.
 */
export interface Subscription {
  readonly id: ID;
  readonly type: SubscriptionType;
  readonly isActive: boolean;
  readonly autoRenew: boolean;
  readonly maxStreams: number;
  readonly renewsAt: Nullable<Timestamp>;
  readonly startedAt: Timestamp;
}

/**
 * Persisted profile data used across account and personalization screens.
 */
export interface UserProfile {
  readonly id: ID;
  readonly fullName: string;
  readonly email: string;
  readonly phoneNumber: Nullable<string>;
  readonly avatarUrl: Nullable<string>;
  readonly preferredLanguage: string;
  readonly isKidsProfile: boolean;
  readonly subscription: Subscription;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

/**
 * Watch history entry for recently viewed content.
 */
export interface WatchHistory {
  readonly id: ID;
  readonly mediaId: ID;
  readonly mediaType: MediaType;
  readonly title: string;
  readonly posterUrl: string;
  readonly watchedAt: Timestamp;
  readonly progressPercentage: number;
  readonly totalDurationInMinutes: number;
  readonly lastPositionInSeconds: number;
}

/**
 * Notification preferences for account-level communication.
 */
export interface NotificationSettings {
  readonly recommendations: boolean;
  readonly downloads: boolean;
  readonly newEpisodes: boolean;
  readonly productUpdates: boolean;
  readonly marketing: boolean;
}

/**
 * Appearance and playback preferences configured by the user.
 */
export interface AppearanceSettings {
  readonly themeMode: ThemePreference;
  readonly autoPlayTrailers: boolean;
  readonly reduceMotionEnabled: boolean;
  readonly dataSaverEnabled: boolean;
}
