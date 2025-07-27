
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export type Connectivity = 'online' | 'offline';

export function useConnectivity(): Connectivity {
  const [status, setStatus] = useState('online' as Connectivity);

  useEffect(() => {
    const sub = NetInfo.addEventListener((state: any) => {
      setStatus(state.isConnected ? 'online' : 'offline');
    });
    return () => sub();
  }, []);

  return status;
}
