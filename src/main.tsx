import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "@/styles/global";
import { RouterProvider } from "react-router-dom";
import router from "@/router.tsx";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme.ts";
import ToastsProvider from "@/provider/toastProvider.tsx";
import Toasts from "@/components/_common/Toasts/Toasts.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  // return worker.start();
}

const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastsProvider>
            <RouterProvider router={router} />
            <GlobalStyles />
            <Toasts />
            <ReactQueryDevtools initialIsOpen={false} />
          </ToastsProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
});
