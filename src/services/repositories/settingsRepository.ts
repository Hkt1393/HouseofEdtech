/**
 * Repository for application settings and preference mutations.
 */

import { APP_STRINGS } from '../../constants';
import type { ApiResponse, AppSettings, ThemePreference } from '../../types';

import {
  createErrorResponse,
  createValidationError,
  mockApiClient,
  showApiErrorToast,
  type RepositoryRequestOptions,
} from '../api';
import { getMockSettings, updateMockLanguage, updateMockTheme } from '../mock';

class SettingsRepository {
  /**
   * Returns the current application settings state.
   */
  async getSettings(
    options?: RepositoryRequestOptions,
  ): Promise<ApiResponse<AppSettings>> {
    return mockApiClient.request<AppSettings>({
      ...options,
      emptyData: null,
      emptyMessage: 'No settings data is available.',
      source: () => getMockSettings(),
      successMessage: 'Settings loaded successfully.',
    });
  }

  /**
   * Updates the theme preference in the mock settings state.
   */
  async updateTheme(
    themeMode: ThemePreference,
    options?: RepositoryRequestOptions,
  ): Promise<ApiResponse<AppSettings>> {
    return mockApiClient.request<AppSettings>({
      ...options,
      emptyData: null,
      emptyMessage: 'Unable to update the theme preference.',
      source: () => updateMockTheme(themeMode),
      successMessage: 'Theme preference updated successfully.',
      successToastMessage: APP_STRINGS.settings.themeUpdatedSuccess,
    });
  }

  /**
   * Updates the language preference in the mock settings state.
   */
  async updateLanguage(
    language: string,
    options?: RepositoryRequestOptions,
  ): Promise<ApiResponse<AppSettings>> {
    const normalizedLanguage = language.trim();

    if (!normalizedLanguage) {
      const validationError = createValidationError(
        'language',
        'Language preference is required.',
      );

      showApiErrorToast(validationError);

      return createErrorResponse(
        validationError,
      );
    }

    return mockApiClient.request<AppSettings>({
      ...options,
      emptyData: null,
      emptyMessage: 'Unable to update the language preference.',
      source: () => updateMockLanguage(normalizedLanguage),
      successMessage: 'Language preference updated successfully.',
      successToastMessage: APP_STRINGS.settings.languageUpdatedSuccess,
    });
  }
}

export const settingsRepository = new SettingsRepository();
