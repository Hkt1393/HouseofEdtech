/**
 * Repository for account profile and watch-history data access.
 */

import { PAGINATION_CONFIG } from '../../constants';
import type {
  ApiResponse,
  AppSettings,
  UserProfile,
  WatchHistory,
} from '../../types';

import { mockApiClient, type PaginatedRequestOptions, type RepositoryRequestOptions } from '../api';
import { getMockProfile, getMockSettings, getMockWatchHistory } from '../mock';

class ProfileRepository {
  /**
   * Returns the active user profile.
   */
  async getProfile(
    options?: RepositoryRequestOptions,
  ): Promise<ApiResponse<UserProfile>> {
    return mockApiClient.request<UserProfile>({
      ...options,
      emptyData: null,
      emptyMessage: 'No profile data is available.',
      source: () => getMockProfile(),
      successMessage: 'Profile loaded successfully.',
    });
  }

  /**
   * Returns the watch-history collection for the active user.
   */
  async getWatchHistory(
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<WatchHistory>>> {
    const watchHistory = getMockWatchHistory();

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No watch history is available.',
      pageSize:
        options?.pageSize ??
        PAGINATION_CONFIG.watchHistoryPageSize,
      source: () => watchHistory,
      successMessage: 'Watch history loaded successfully.',
    });
  }

  /**
   * Returns the current preference set associated with the active profile.
   */
  async getPreferences(
    options?: RepositoryRequestOptions,
  ): Promise<ApiResponse<AppSettings>> {
    return mockApiClient.request<AppSettings>({
      ...options,
      emptyData: null,
      emptyMessage: 'No profile preferences are available.',
      source: () => getMockSettings(),
      successMessage: 'Profile preferences loaded successfully.',
    });
  }
}

export const profileRepository = new ProfileRepository();
