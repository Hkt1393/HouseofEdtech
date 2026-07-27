import { useContext } from 'react';

import { NetworkContext } from '../providers';

export const useNetwork = () => {
  const networkContext = useContext(NetworkContext);

  if (!networkContext) {
    throw new Error('useNetwork must be used within a NetworkProvider.');
  }

  return networkContext;
};
