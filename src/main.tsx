import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from "./components/toastProvider/ToastProvider.tsx";
import ProductProvider from "./provider/ProductProvider.tsx";
import CartProvider from "./provider/CartProvider.tsx";
import { DataProvider } from "./components/dataProvider/DataProvider.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  return worker.start();
}
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ToastProvider>
        <ProductProvider>
          <CartProvider>
            <DataProvider>
              <App />
            </DataProvider>
          </CartProvider>
        </ProductProvider>
      </ToastProvider>
    </React.StrictMode>
  );
});
