import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { BASE_URL } from "./app/config/base.ts";
import { ProductProvider } from "./features/product/contexts/ProductContext.tsx";
import { ModalProvider } from "./shared/contexts/ModalContext.tsx";
import { ToastProvider } from "./shared/contexts/ToastContext.tsx";
import { CartProvider } from "./features/cart/contexts/CartContext.tsx";

async function enableMocking() {
  if (!import.meta.env.VITE_USE_MOCK) return;

  const { worker } = await import("./__mocks__/browser.ts");

  return worker.start({
    serviceWorker: {
      url: `${window.location.origin}${BASE_URL}mockServiceWorker.js`,
      options: { scope: BASE_URL },
    },
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <ToastProvider>
          <CartProvider>
            <ProductProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
            </ProductProvider>
          </CartProvider>
        </ToastProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
