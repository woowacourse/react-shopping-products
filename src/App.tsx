import GlobalStyles from "@/styles/global";
import { RouterProvider } from "react-router-dom";
import router from "@/router.tsx";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme.ts";
import Toasts from "@/components/_common/Toasts/Toasts.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import createQueryClient from "@/queryClient";
import useToast from "@/hooks/useToast";

const App = () => {
  const { onAddToast } = useToast();
  const queryClient = createQueryClient(onAddToast);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <Toasts />
        <GlobalStyles />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
