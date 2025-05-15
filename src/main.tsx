import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorContextProvider } from "./contexts/ErrorContext";
import { CartContextProvider } from "./contexts/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ErrorContextProvider>
  </React.StrictMode>
);
