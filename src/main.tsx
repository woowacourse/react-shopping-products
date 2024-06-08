import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ErrorProvider } from "./context/errorContext.tsx";
import { CartProvider } from "./context/cartContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </CartProvider>
    </ErrorProvider>
  </React.StrictMode>
);
