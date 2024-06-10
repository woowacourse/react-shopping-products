import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import useProducts from "../products/useProducts";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useProduct 훅 테스트", () => {
  describe("상품 목록 조회", () => {
    it("상품 목록을 가져올 수 있다", async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.products[0].content?.length).toBe(100);
    });
  });
});
