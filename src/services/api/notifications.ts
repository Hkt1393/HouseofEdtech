import { APP_STRINGS } from '../../constants';
import type { ApiError } from '../../types';

import { networkService } from '../network';
import { toast } from '../toast';

import { createNetworkError, type RequestFeedbackOptions } from './errors';

const DEFAULT_SUCCESS_TOAST_TITLE = APP_STRINGS.toast.successTitle;

const resolveErrorToastContent = (
  error?: ApiError,
  fallbackMessage?: string,
): {
  readonly message: string;
  readonly title: string;
} => {
  if (!error) {
    return {
      title: APP_STRINGS.errors.genericTitle,
      message: fallbackMessage ?? APP_STRINGS.errors.genericDescription,
    };
  }

  if (
    error.code === 'NETWORK_UNAVAILABLE' ||
    error.statusCode === 503
  ) {
    return {
      title: APP_STRINGS.errors.networkTitle,
      message: APP_STRINGS.errors.networkDescription,
    };
  }

  if (error.code === 'TMDB_TIMEOUT' || error.statusCode === 504) {
    return {
      title: APP_STRINGS.errors.timeoutTitle,
      message: APP_STRINGS.errors.timeoutDescription,
    };
  }

  if (
    error.code === 'TMDB_AUTHENTICATION_ERROR' ||
    error.statusCode === 401
  ) {
    return {
      title: APP_STRINGS.errors.unauthorizedTitle,
      message:
        fallbackMessage ??
        error.message ??
        APP_STRINGS.errors.unauthorizedDescription,
    };
  }

  if (
    error.code === 'SERVER_ERROR' ||
    error.statusCode >= 500
  ) {
    return {
      title: APP_STRINGS.errors.serverTitle,
      message:
        fallbackMessage ??
        error.message ??
        APP_STRINGS.errors.serverDescription,
    };
  }

  return {
    title: APP_STRINGS.errors.genericTitle,
    message:
      fallbackMessage ??
      error.message ??
      APP_STRINGS.errors.genericDescription,
  };
};

export const ensureConnectivityBeforeRequest = async (
  notifyOnError: boolean = true,
): Promise<ApiError | null> => {
  const isConnected = await networkService.ensureConnected();

  if (isConnected) {
    return null;
  }

  const networkError = createNetworkError();

  if (notifyOnError) {
    showApiErrorToast(networkError);
  }

  return networkError;
};

export const showApiErrorToast = (
  error?: ApiError,
  fallbackMessage?: string,
): void => {
  const { message, title } = resolveErrorToastContent(error, fallbackMessage);

  toast.error({
    title,
    message,
  });
};

export const showApiSuccessToast = (
  message: string,
  title: string = DEFAULT_SUCCESS_TOAST_TITLE,
): void => {
  toast.success({
    title,
    message,
  });
};

export const maybeShowApiSuccessToast = (
  options?: Pick<
    RequestFeedbackOptions,
    'successToastMessage' | 'successToastTitle'
  >,
): void => {
  if (!options?.successToastMessage) {
    return;
  }

  showApiSuccessToast(
    options.successToastMessage,
    options.successToastTitle ?? DEFAULT_SUCCESS_TOAST_TITLE,
  );
};
