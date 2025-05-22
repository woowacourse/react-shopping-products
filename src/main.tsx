import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {ErrorProvider} from './shared/provider/errorProvider.tsx';
import {ApiProvider} from './features/products/provider/apiProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ErrorProvider>
  </React.StrictMode>
);
