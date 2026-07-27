/**
 * Repository for offline-download inventory and mutation flows.
 */

import { APP_STRINGS } from '../../constants';
import type { ApiResponse, DownloadsOverview } from '../../types';

import {
  createErrorResponse,
  createNotFoundError,
  mockApiClient,
  MOCK_REQUEST_SCENARIOS,
  showApiErrorToast,
  type RepositoryRequestOptions,
} from '../api';
import {
  getMockDownloadsOverview,
  hasMockDownload,
  removeMockDownload,
} from '../mock';

const isSuccessScenario = (scenario?: RepositoryRequestOptions['scenario']): boolean => {
  return !scenario || scenario === MOCK_REQUEST_SCENARIOS.success;
};

const createEmptyDownloadsOverview = (): DownloadsOverview => {
  const currentStorageInfo = getMockDownloadsOverview().storageInfo;

  return {
    items: [],
    storageInfo: {
      usedBytes: 0,
      availableBytes: currentStorageInfo.totalBytes,
      totalBytes: currentStorageInfo.totalBytes,
      usagePercentage: 0,
    },
  };
};

class DownloadRepository {
  /**
   * Returns the active downloads overview with storage metadata.
   */
  async getDownloads(
    options?: RepositoryRequestOptions,
  ): Promise<ApiResponse<DownloadsOverview>> {
    return mockApiClient.request<DownloadsOverview>({
      ...options,
      emptyData: createEmptyDownloadsOverview(),
      emptyMessage: 'No downloads are available.',
      source: () => getMockDownloadsOverview(),
      successMessage: 'Downloads loaded successfully.',
    });
  }

  /**
   * Deletes a download by id and returns the updated downloads overview.
   */
  async deleteDownload(
    downloadId: string,
    options?: RepositoryRequestOptions,
  ): Promise<ApiResponse<DownloadsOverview>> {
    if (isSuccessScenario(options?.scenario) && !hasMockDownload(downloadId)) {
      const notFoundError = createNotFoundError('Download', downloadId);

      showApiErrorToast(notFoundError);

      return createErrorResponse(notFoundError);
    }

    return mockApiClient.request<DownloadsOverview>({
      ...options,
      emptyData: createEmptyDownloadsOverview(),
      emptyMessage: 'No downloads remain after deletion.',
      source: () => {
        removeMockDownload(downloadId);

        return getMockDownloadsOverview();
      },
      successMessage: 'Download deleted successfully.',
      successToastMessage: APP_STRINGS.downloads.deleteSuccessMessage,
    });
  }
}

export const downloadRepository = new DownloadRepository();
