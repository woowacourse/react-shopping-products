import { QueryClient, QueryCache } from "@tanstack/react-query";

const createQueryClient = (onAddToast: (message: string) => void) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: "always",
        retry: 0,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        return onAddToast(error.message);
      },
    }),
  });
};

export default createQueryClient;
