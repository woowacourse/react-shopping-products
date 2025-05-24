import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ProductListProvider } from './context/ProductContext.tsx';
import { CartListProvider } from './context/CartContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ToastProvider>
        <ProductListProvider>
          <CartListProvider>
            <App />
          </CartListProvider>
        </ProductListProvider>
      </ToastProvider>
    </React.StrictMode>
  );
});
