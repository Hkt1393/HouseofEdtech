import * as ExpoNetwork from 'expo-network';
import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { OfflineFeedback } from '../components/feedback';
import { networkService } from '../services';
import type { NetworkContextValue, ThemeProviderProps } from '../types';

export const NetworkContext = createContext<NetworkContextValue | undefined>(
  undefined,
);

const NetworkProviderComponent = ({
  children,
}: Pick<ThemeProviderProps, 'children'>) => {
  const [networkSnapshot, setNetworkSnapshot] = useState(
    networkService.getSnapshot(),
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);

    try {
      return await networkService.refresh();
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = networkService.subscribe(setNetworkSnapshot);
    const subscription = ExpoNetwork.addNetworkStateListener((event) => {
      networkService.updateFromNativeState(event);
    });

    void refresh();

    return () => {
      unsubscribe();
      subscription.remove();
    };
  }, [refresh]);

  const contextValue = useMemo<NetworkContextValue>(
    () => ({
      ...networkSnapshot,
      refresh,
    }),
    [networkSnapshot, refresh],
  );

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
      <OfflineFeedback
        isRefreshing={isRefreshing}
        onRetry={refresh}
        visible={!networkSnapshot.isChecking && networkSnapshot.isOffline}
      />
    </NetworkContext.Provider>
  );
};

NetworkProviderComponent.displayName = 'NetworkProvider';

export const NetworkProvider = memo(NetworkProviderComponent);
