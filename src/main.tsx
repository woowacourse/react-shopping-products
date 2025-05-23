import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// import Product from './ui/components/Product/Product.tsx';
import { ProductListProvider } from './context/ProductContext.tsx';
import { CartListProvider } from './context/CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductListProvider>
      <CartListProvider>
        <App />
      </CartListProvider>
    </ProductListProvider>
  </React.StrictMode>
);
