import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ToastContextProvider } from './context/ToastContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContextProvider>
      <App />
    </ToastContextProvider>
  </React.StrictMode>,
);
