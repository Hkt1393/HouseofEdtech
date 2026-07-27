/**
 * Shared settings contracts used by profile and application settings flows.
 */

import type { DownloadQuality } from './downloads';
import type { AppearanceSettings, NotificationSettings } from './profile';

/**
 * Playback preferences configured globally for the application.
 */
export interface PlaybackSettings {
  readonly autoplayNextEpisode: boolean;
  readonly defaultAudioLanguage: string;
  readonly defaultSubtitleLanguage: string;
  readonly downloadOverWifiOnly: boolean;
  readonly preferredDownloadQuality: DownloadQuality;
}

/**
 * Aggregated application settings returned by the settings repository.
 */
export interface AppSettings {
  readonly language: string;
  readonly appearance: AppearanceSettings;
  readonly notifications: NotificationSettings;
  readonly playback: PlaybackSettings;
}
