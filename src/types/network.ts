import type { NetworkStateType } from 'expo-network';

/**
 * Normalized network snapshot shared across providers, hooks, and services.
 */
export interface NetworkSnapshot {
  readonly type: NetworkStateType | null;
  readonly isChecking: boolean;
  readonly isConnected: boolean;
  readonly isInternetReachable: boolean;
  readonly isOffline: boolean;
}

/**
 * Network context contract exposed to the app.
 */
export interface NetworkContextValue extends NetworkSnapshot {
  refresh: () => Promise<NetworkSnapshot>;
}
