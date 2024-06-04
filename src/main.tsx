import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ErrorProvider } from "./context/errorContext.tsx";
import { CartProvider } from "./context/cartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ErrorProvider>
  </React.StrictMode>
);
