import * as ExpoNetwork from 'expo-network';
import type { NetworkState } from 'expo-network';

import type { NetworkSnapshot } from '../types';

type NetworkListener = (snapshot: NetworkSnapshot) => void;

const FALLBACK_OFFLINE_SNAPSHOT: NetworkSnapshot = {
  type: null,
  isChecking: false,
  isConnected: false,
  isInternetReachable: false,
  isOffline: true,
};

export const INITIAL_NETWORK_SNAPSHOT: NetworkSnapshot = {
  type: null,
  isChecking: true,
  isConnected: true,
  isInternetReachable: true,
  isOffline: false,
};

const isSameSnapshot = (
  currentSnapshot: NetworkSnapshot,
  nextSnapshot: NetworkSnapshot,
): boolean => {
  return (
    currentSnapshot.type === nextSnapshot.type &&
    currentSnapshot.isChecking === nextSnapshot.isChecking &&
    currentSnapshot.isConnected === nextSnapshot.isConnected &&
    currentSnapshot.isInternetReachable === nextSnapshot.isInternetReachable &&
    currentSnapshot.isOffline === nextSnapshot.isOffline
  );
};

const normalizeNetworkState = (
  networkState: NetworkState,
): NetworkSnapshot => {
  const isConnected = networkState.isConnected ?? false;
  const isInternetReachable =
    networkState.isInternetReachable ?? isConnected;

  return {
    type: networkState.type ?? null,
    isChecking: false,
    isConnected,
    isInternetReachable,
    isOffline: !isConnected || !isInternetReachable,
  };
};

class NetworkService {
  private listeners = new Set<NetworkListener>();

  private snapshot: NetworkSnapshot = INITIAL_NETWORK_SNAPSHOT;

  getSnapshot = (): NetworkSnapshot => {
    return this.snapshot;
  };

  subscribe = (listener: NetworkListener): (() => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  updateFromNativeState = (networkState: NetworkState): void => {
    this.applySnapshot(normalizeNetworkState(networkState));
  };

  refresh = async (): Promise<NetworkSnapshot> => {
    try {
      const networkState = await ExpoNetwork.getNetworkStateAsync();
      const nextSnapshot = normalizeNetworkState(networkState);

      this.applySnapshot(nextSnapshot);

      return nextSnapshot;
    } catch {
      this.applySnapshot(FALLBACK_OFFLINE_SNAPSHOT);

      return FALLBACK_OFFLINE_SNAPSHOT;
    }
  };

  ensureConnected = async (): Promise<boolean> => {
    if (this.snapshot.isChecking) {
      const nextSnapshot = await this.refresh();

      return !nextSnapshot.isOffline;
    }

    return !this.snapshot.isOffline;
  };

  private applySnapshot = (nextSnapshot: NetworkSnapshot): void => {
    if (isSameSnapshot(this.snapshot, nextSnapshot)) {
      return;
    }

    this.snapshot = nextSnapshot;
    this.listeners.forEach((listener) => {
      listener(nextSnapshot);
    });
  };
}

export const networkService = new NetworkService();
