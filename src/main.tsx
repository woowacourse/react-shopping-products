import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "@/styles/global";
import { RouterProvider } from "react-router-dom";
import router from "@/router.tsx";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme.ts";
import CartItemProvider from "@/provider/cartItemProvider.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  //return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CartItemProvider>
          <RouterProvider router={router} />
          <GlobalStyles />
        </CartItemProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
});
