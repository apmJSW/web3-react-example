import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Web3ReactProvider} from '@web3-react/core';
import {getProvider} from './utils/provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getProvider}>
    {/* <Web3ReactProvider getLibrary={() => {}}> */}
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);
