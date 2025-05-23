import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { worker } from './mocks/browser.ts';
import { ErrorContextProvider } from './contexts/ErrorContext.tsx';
import './index.css';
import { ApiProvider } from './contexts/ApiContext.tsx';

if (import.meta.env.VITE_ENABLE_MSW === 'true') {
  worker
    .start({
      onUnhandledRequest: 'bypass'
    })
    .then(() => {
      createRoot(document.getElementById('root')!).render(
        <ErrorContextProvider>
          <ApiProvider>
            <App />
          </ApiProvider>
        </ErrorContextProvider>
      );
    });
} else {
  createRoot(document.getElementById('root')!).render(
    <ErrorContextProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ErrorContextProvider>
  );
}
