import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { worker } from "./mocks/browser";

import { ErrorMessageProvider } from "./context/ErrorMessageContext.tsx";
import { CartItemsIdProvider } from "./context/CartItemsContext.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ErrorMessageProvider>
        <CartItemsIdProvider>
          <App />
        </CartItemsIdProvider>
      </ErrorMessageProvider>
    </React.StrictMode>
  );
});
