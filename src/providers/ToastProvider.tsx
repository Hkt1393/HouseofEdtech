import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ToastFeedback } from '../components/feedback';
import { useTheme } from '../theme';
import type { ThemeProviderProps, ToastContextValue, ToastItem } from '../types';
import { toast } from '../services';

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);

const ToastProviderComponent = ({
  children,
}: Pick<ThemeProviderProps, 'children'>) => {
  const { animation, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeToast, setActiveToast] = useState<ToastItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [toastQueue, setToastQueue] = useState<ReadonlyArray<ToastItem>>([]);

  const enqueueToast = useCallback(
    (nextToast: ToastItem) => {
      setToastQueue((currentQueue) => {
        if (activeToast?.dedupeKey === nextToast.dedupeKey) {
          return currentQueue;
        }

        if (
          currentQueue.some(
            (toastItem) => toastItem.dedupeKey === nextToast.dedupeKey,
          )
        ) {
          return currentQueue;
        }

        return [...currentQueue, nextToast];
      });
    },
    [activeToast?.dedupeKey],
  );

  const dismissToast = useCallback(
    (id?: string) => {
      setToastQueue((currentQueue) => {
        if (!id) {
          return currentQueue;
        }

        return currentQueue.filter((toastItem) => toastItem.id !== id);
      });

      if (!activeToast) {
        return;
      }

      if (!id || activeToast.id === id) {
        setIsVisible(false);
      }
    },
    [activeToast],
  );

  useEffect(() => {
    return toast.subscribe((command) => {
      if (command.type === 'show') {
        enqueueToast(command.toast);

        return;
      }

      dismissToast(command.id);
    });
  }, [dismissToast, enqueueToast]);

  useEffect(() => {
    if (activeToast || toastQueue.length === 0) {
      return;
    }

    const [nextToast] = toastQueue;

    setToastQueue((currentQueue) => currentQueue.slice(1));
    setActiveToast(nextToast);
    setIsVisible(true);
  }, [activeToast, toastQueue]);

  useEffect(() => {
    if (!activeToast) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, activeToast.durationMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeToast]);

  useEffect(() => {
    if (isVisible || !activeToast) {
      return;
    }

    const timeout = setTimeout(() => {
      setActiveToast(null);
    }, animation.duration.normal);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeToast, animation.duration.normal, isVisible]);

  const contextValue = useMemo<ToastContextValue>(
    () => ({
      dismiss: toast.dismiss,
      error: toast.error,
      info: toast.info,
      show: toast.show,
      success: toast.success,
      warning: toast.warning,
    }),
    [],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastFeedback
        bottomInset={insets.bottom + spacing['2xl']}
        isVisible={isVisible}
        onDismiss={() => {
          dismissToast(activeToast?.id);
        }}
        toastItem={activeToast}
      />
    </ToastContext.Provider>
  );
};

ToastProviderComponent.displayName = 'ToastProvider';

export const ToastProvider = memo(ToastProviderComponent);
