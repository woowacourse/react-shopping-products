import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ModalProvider } from "./app/providers/ModalContext.tsx";
import { ToastProvider } from "./app/providers/ToastContext.tsx";
import { CartItemProvider } from "./entities/cartItem/model/providers/CartItemContext.tsx";
import { ProductProvider } from "./entities/product/model/providers/ProductContext.tsx";
import { BASE_URL } from "./shared/config/base.ts";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

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
      <ToastProvider>
        <ProductProvider>
          <CartItemProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </CartItemProvider>
        </ProductProvider>
      </ToastProvider>
    </React.StrictMode>
  );
});
