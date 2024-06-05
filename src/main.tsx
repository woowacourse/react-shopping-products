import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalLayout, GlobalStyle } from "./styles/GlobalStyle.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <GlobalStyle />
      <GlobalLayout>
        <App />
      </GlobalLayout>
    </QueryClientProvider>
  </>
);
