import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorContextProvider } from "./contexts/ErrorContext";
import { CartContextProvider } from "./contexts/CartContext.tsx";
import { ProductContextProvider } from "./contexts/ProductContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductContextProvider>
      <CartContextProvider>
        <ErrorContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ErrorContextProvider>
      </CartContextProvider>
    </ProductContextProvider>
  </React.StrictMode>
);
