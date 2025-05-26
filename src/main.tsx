import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorContextProvider } from './contexts/ErrorContext.tsx';
import { ApiProvider } from './contexts/ApiContext.tsx';
import './index.css';

async function enableMocking() {
  const { worker } = await import('./mocks/browser.ts');

  const isLocalhost = location.hostname === 'localhost';

  await worker.start({
    serviceWorker: {
      url: isLocalhost ? '/mockServiceWorker.js' : '/react-shopping-products/mockServiceWorker.js'
    },
    onUnhandledRequest: 'bypass'
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <ErrorContextProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ErrorContextProvider>
  );
});
