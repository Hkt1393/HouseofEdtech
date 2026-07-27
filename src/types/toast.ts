/**
 * Toast variants supported by the global feedback layer.
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Input used to enqueue a new toast notification.
 */
export interface ToastInput {
  readonly type: ToastType;
  readonly title: string;
  readonly message: string;
  readonly dedupeKey?: string;
  readonly durationMs?: number;
}

/**
 * Fully resolved toast payload rendered by the provider.
 */
export interface ToastItem extends ToastInput {
  readonly id: string;
  readonly dedupeKey: string;
  readonly durationMs: number;
}

/**
 * Public toast API exposed through the provider hook and singleton service.
 */
export interface ToastContextValue {
  dismiss: (id?: string) => void;
  error: (input: Omit<ToastInput, 'type'>) => string;
  info: (input: Omit<ToastInput, 'type'>) => string;
  show: (input: ToastInput) => string;
  success: (input: Omit<ToastInput, 'type'>) => string;
  warning: (input: Omit<ToastInput, 'type'>) => string;
}
