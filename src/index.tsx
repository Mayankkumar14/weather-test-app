import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

import { SnackBarProvider } from './contexts/useSnackbar';
import { NetworkProvider } from './contexts/useNetwork';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SnackBarProvider>
      <NetworkProvider>
        <App />  
      </NetworkProvider>
    </SnackBarProvider>
  </React.StrictMode>
);

