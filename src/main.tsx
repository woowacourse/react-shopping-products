import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ErrorMessageProvider } from "./context/ErrorMessageContext.tsx";
import { CartItemsIdProvider } from "./context/CartItemsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorMessageProvider>
      <CartItemsIdProvider>
        <App />
      </CartItemsIdProvider>
    </ErrorMessageProvider>
  </React.StrictMode>
);
