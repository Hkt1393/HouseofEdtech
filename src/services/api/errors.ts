/**
 * Standardized mock API error factories and scenario configuration types.
 */

import type { ApiError, ID } from '../../types';

import type { DelayDuration } from './delay';

export const MOCK_REQUEST_SCENARIOS = {
  success: 'success',
  empty: 'empty',
  networkError: 'network-error',
  serverError: 'server-error',
} as const;

export type MockRequestScenario =
  (typeof MOCK_REQUEST_SCENARIOS)[keyof typeof MOCK_REQUEST_SCENARIOS];

export interface RequestFeedbackOptions {
  readonly notifyOnError?: boolean;
  readonly successToastMessage?: string;
  readonly successToastTitle?: string;
}

export interface RepositoryRequestOptions extends RequestFeedbackOptions {
  readonly scenario?: MockRequestScenario;
  readonly delayMs?: DelayDuration;
}

export interface PaginatedRequestOptions extends RepositoryRequestOptions {
  readonly page?: number;
  readonly pageSize?: number;
}

const ERROR_STATUS_CODES = {
  badRequest: 400,
  notFound: 404,
  server: 500,
  network: 503,
} as const;

const createRequestId = (prefix: string): ID => {
  return `${prefix}-${Date.now()}`;
};

/**
 * Creates a reusable API error payload.
 */
export const createApiError = (
  code: string,
  message: string,
  statusCode: number,
  fieldErrors?: Readonly<Record<string, string>>,
): ApiError => ({
  code,
  message,
  statusCode,
  requestId: createRequestId(code.toLowerCase()),
  fieldErrors,
  timestamp: new Date().toISOString(),
});

/**
 * Creates a network-style mock error.
 */
export const createNetworkError = (): ApiError =>
  createApiError(
    'NETWORK_UNAVAILABLE',
    'The network is temporarily unavailable.',
    ERROR_STATUS_CODES.network,
  );

/**
 * Creates a server-style mock error.
 */
export const createServerError = (): ApiError =>
  createApiError(
    'SERVER_ERROR',
    'The service is temporarily unavailable.',
    ERROR_STATUS_CODES.server,
  );

/**
 * Creates a not-found mock error for a missing resource.
 */
export const createNotFoundError = (
  resourceName: string,
  resourceId: string,
): ApiError =>
  createApiError(
    'RESOURCE_NOT_FOUND',
    `${resourceName} with id "${resourceId}" was not found.`,
    ERROR_STATUS_CODES.notFound,
  );

/**
 * Creates a validation mock error for invalid request input.
 */
export const createValidationError = (
  fieldName: string,
  message: string,
): ApiError =>
  createApiError(
    'VALIDATION_ERROR',
    message,
    ERROR_STATUS_CODES.badRequest,
    {
      [fieldName]: message,
    },
  );
