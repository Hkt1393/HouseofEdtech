/**
 * Generic fake API client that reads mock datasets and returns standardized
 * response envelopes with delay and scenario simulation.
 */

import { PAGINATION_CONFIG } from '../../constants';

import type { ApiResponse, Nullable, PaginationMeta } from '../../types';

import { delay, DELAY_PRESETS } from './delay';
import {
  createNetworkError,
  createServerError,
  MOCK_REQUEST_SCENARIOS,
  type PaginatedRequestOptions,
  type RepositoryRequestOptions,
} from './errors';
import {
  createEmptyResponse,
  createErrorResponse,
  createPaginatedResponse,
  createPaginationMeta,
  createSuccessResponse,
  paginateItems,
} from './response';

interface MockApiRequestConfig<TData> extends RepositoryRequestOptions {
  readonly source: () => Nullable<TData>;
  readonly successMessage: string;
  readonly emptyMessage: string;
  readonly emptyData?: Nullable<TData>;
  readonly meta?: PaginationMeta;
}

interface MockApiCollectionRequestConfig<TItem>
  extends PaginatedRequestOptions {
  readonly source: () => ReadonlyArray<TItem>;
  readonly successMessage: string;
  readonly emptyMessage: string;
}

const resolveScenario = (
  scenario?: RepositoryRequestOptions['scenario'],
): RepositoryRequestOptions['scenario'] => {
  return scenario ?? MOCK_REQUEST_SCENARIOS.success;
};

const resolveEmptyData = <TData>(
  emptyData: Nullable<TData> | undefined,
  data: Nullable<TData>,
): Nullable<TData> => {
  if (emptyData !== undefined) {
    return emptyData;
  }

  if (Array.isArray(data)) {
    return [] as TData;
  }

  return null;
};

class MockApiClient {
  /**
   * Executes a mock request for singular or aggregate payloads.
   */
  async request<TData>({
    delayMs = DELAY_PRESETS.standard,
    emptyData,
    emptyMessage,
    meta,
    scenario,
    source,
    successMessage,
  }: MockApiRequestConfig<TData>): Promise<ApiResponse<TData>> {
    await delay(delayMs);

    switch (resolveScenario(scenario)) {
      case MOCK_REQUEST_SCENARIOS.networkError:
        return createErrorResponse(createNetworkError());
      case MOCK_REQUEST_SCENARIOS.serverError:
        return createErrorResponse(createServerError());
      case MOCK_REQUEST_SCENARIOS.empty:
        return createEmptyResponse(
          resolveEmptyData(emptyData, null),
          emptyMessage,
          meta,
        );
      default:
        break;
    }

    const data = source();

    if (
      data === null ||
      (Array.isArray(data) && data.length === 0)
    ) {
      return createEmptyResponse(
        resolveEmptyData(emptyData, data),
        emptyMessage,
        meta,
      );
    }

    return createSuccessResponse(data, successMessage, meta);
  }

  /**
   * Executes a mock request for readonly collections with pagination metadata.
   */
  async requestCollection<TItem>({
    delayMs = DELAY_PRESETS.standard,
    emptyMessage,
    page = PAGINATION_CONFIG.initialPage,
    pageSize = PAGINATION_CONFIG.searchPageSize,
    scenario,
    source,
    successMessage,
  }: MockApiCollectionRequestConfig<TItem>): Promise<
    ApiResponse<ReadonlyArray<TItem>>
  > {
    await delay(delayMs);

    switch (resolveScenario(scenario)) {
      case MOCK_REQUEST_SCENARIOS.networkError:
        return createErrorResponse(createNetworkError());
      case MOCK_REQUEST_SCENARIOS.serverError:
        return createErrorResponse(createServerError());
      case MOCK_REQUEST_SCENARIOS.empty: {
        const emptyMeta = createPaginationMeta(page, pageSize, 0);

        return createEmptyResponse([], emptyMessage, emptyMeta);
      }
      default:
        break;
    }

    const items = source();

    if (items.length === 0) {
      const emptyMeta = createPaginationMeta(page, pageSize, 0);

      return createEmptyResponse([], emptyMessage, emptyMeta);
    }

    const paginatedItems = paginateItems(items, page, pageSize);

    return createPaginatedResponse(
      paginatedItems,
      successMessage,
      page,
      pageSize,
      items.length,
    );
  }
}

export const mockApiClient = new MockApiClient();
