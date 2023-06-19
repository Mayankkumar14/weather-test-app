import React, { createContext, useContext, useState, useCallback } from 'react';

import { Snackbar, AlertColor } from '@mui/material'; 
import MuiAlert from '@mui/material/Alert';

import { ERRORS } from '../utils/constants';

type SnackBarContextActions = {
  showSuccessMessage: (message: string) => void;
  showErrorMessage: (message: string) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children?: React.ReactNode;
}

const SnackBarProvider: React.FC<SnackBarContextProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<AlertColor>('info');

  const showErrorMessage = useCallback((message: string) => {
    setMessage(message);
    setAlertType('error');
    setOpen(true);
  }, []) 

  const showSuccessMessage = useCallback((message: string) => {
    setMessage(message);
    setAlertType('success');
    setOpen(true);
  }, []) 

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <SnackBarContext.Provider value={{ showSuccessMessage, showErrorMessage }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}>
        <MuiAlert 
          elevation={6} 
          variant='filled'
          onClose={handleClose}
          severity={alertType}>
          {message}
        </MuiAlert>    
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = (): SnackBarContextActions => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error(ERRORS.USE_SNACKBAR_CONTEXT);
  }

  return context;
};

export { SnackBarProvider, useSnackBar };