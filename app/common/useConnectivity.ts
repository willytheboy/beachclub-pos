
import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export type Connectivity = 'online' | 'offline';

export function useConnectivity(): Connectivity {
  const [status, setStatus] = useState<Connectivity>('online');

  useEffect(() => {
    const sub = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus(state.isConnected ? 'online' : 'offline');
    });
    return () => sub();
  }, []);

  return status;
}
