import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Mall from "./pages/Mall";
import { ToastProvider } from "./components/Toasts/ToastProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Mall />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
