import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { UIProvider } from "./contexts/UIContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UIProvider>
      <CartProvider setGlobalLoading={() => {}}>
        <App />
      </CartProvider>
    </UIProvider>
  </React.StrictMode>,
);
