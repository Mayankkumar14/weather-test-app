import React, { 
  createContext,
  useState, 
  useEffect,
  useContext 
} from 'react';
import { useSnackBar } from './useSnackbar';

import { ERRORS, SUCCESS } from '../utils/constants';

type NetworkContextValues = {
  isOnline: boolean;
};

const NetworkContext = createContext({} as NetworkContextValues)

type NetworkProviderProps = {
  children: React.ReactNode;
}

const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const { showErrorMessage, showSuccessMessage } = useSnackBar();

  useEffect(() => {
    
    const handleOnline = () => {
      if (!isOnline) {
        showSuccessMessage(SUCCESS.ONLINE);
      }
      setIsOnline(true);
    };
    
    const handleOffline = () => {
      if (isOnline) {
        showErrorMessage(ERRORS.OFFLINE);
      }
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline, showErrorMessage, showSuccessMessage]);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = (): NetworkContextValues => {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error(ERRORS.USE_NETWORK_CONTEXT);
  }

  return context;
};

export { NetworkProvider, useNetwork };
