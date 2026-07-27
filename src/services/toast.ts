import type { ToastContextValue, ToastInput, ToastItem } from '../types';

export interface ToastShowCommand {
  readonly type: 'show';
  readonly toast: ToastItem;
}

export interface ToastDismissCommand {
  readonly type: 'dismiss';
  readonly id?: string;
}

export type ToastCommand = ToastDismissCommand | ToastShowCommand;
export type ToastCommandListener = (command: ToastCommand) => void;

const DEFAULT_TOAST_DURATION_MS = 3000;

let toastSequence = 0;

const buildToastId = (): string => {
  toastSequence += 1;

  return `toast-${Date.now()}-${toastSequence}`;
};

const buildDedupeKey = ({
  dedupeKey,
  message,
  title,
  type,
}: ToastInput): string => {
  return dedupeKey ?? `${type}:${title}:${message}`;
};

const createToastItem = (input: ToastInput): ToastItem => ({
  ...input,
  dedupeKey: buildDedupeKey(input),
  durationMs: input.durationMs ?? DEFAULT_TOAST_DURATION_MS,
  id: buildToastId(),
});

class ToastService implements ToastContextValue {
  private listeners = new Set<ToastCommandListener>();

  subscribe = (listener: ToastCommandListener): (() => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  dismiss = (id?: string): void => {
    this.emit({
      type: 'dismiss',
      id,
    });
  };

  show = (input: ToastInput): string => {
    const toast = createToastItem(input);

    this.emit({
      type: 'show',
      toast,
    });

    return toast.id;
  };

  success = (input: Omit<ToastInput, 'type'>): string => {
    return this.show({
      ...input,
      type: 'success',
    });
  };

  error = (input: Omit<ToastInput, 'type'>): string => {
    return this.show({
      ...input,
      type: 'error',
    });
  };

  warning = (input: Omit<ToastInput, 'type'>): string => {
    return this.show({
      ...input,
      type: 'warning',
    });
  };

  info = (input: Omit<ToastInput, 'type'>): string => {
    return this.show({
      ...input,
      type: 'info',
    });
  };

  private emit = (command: ToastCommand): void => {
    this.listeners.forEach((listener) => {
      listener(command);
    });
  };
}

export const toast = new ToastService();
