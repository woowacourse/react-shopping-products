import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {ErrorProvider} from './shared/provider/errorProvider.tsx';
import {ApiProvider} from './features/products/provider/apiProvider.tsx';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const {worker} = await import('./mocks/browser.ts');
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </ErrorProvider>
    </React.StrictMode>
  );
});
