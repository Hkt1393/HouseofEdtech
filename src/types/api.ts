/**
 * Shared API envelope contracts used by the service and repository layers.
 */

import type { ID, Nullable, Pagination, Timestamp } from './common';

/**
 * Network request lifecycle states used by async data sources.
 */
export enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

/**
 * Structured API error metadata for failed requests.
 */
export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly statusCode: number;
  readonly requestId?: ID;
  readonly fieldErrors?: Readonly<Record<string, string>>;
  readonly timestamp?: Timestamp;
}

/**
 * Pagination metadata returned by list responses.
 */
export interface PaginationMeta extends Pagination {
  readonly totalItems: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

/**
 * Base API envelope shared by success and error responses.
 */
export interface ApiResponse<TData> {
  readonly success: boolean;
  readonly data: Nullable<TData>;
  readonly message: string;
  readonly timestamp: Timestamp;
  readonly meta?: PaginationMeta;
  readonly error?: ApiError;
}

/**
 * Success response contract for a resolved request.
 */
export interface SuccessResponse<TData> extends ApiResponse<TData> {
  readonly success: true;
  readonly data: TData;
  readonly error?: never;
}

/**
 * Error response contract for a failed request.
 */
export interface ErrorResponse extends ApiResponse<never> {
  readonly success: false;
  readonly data: null;
  readonly error: ApiError;
}

/**
 * Paginated success response contract for list endpoints.
 */
export interface PaginatedResponse<TItem>
  extends SuccessResponse<ReadonlyArray<TItem>> {
  readonly meta: PaginationMeta;
}
