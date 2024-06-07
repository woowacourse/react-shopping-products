import { renderHook, waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import { ToastProvider } from '../context/ToastProvider';

describe('useProducts', () => {
  describe('상품 목록 조회', () => {
    it('초기 상품 목록을 가져온다', async () => {
      const { result } = renderHook(() => useProducts(), { wrapper: ToastProvider });

      await waitFor(() => {
        expect(result.current.products.length).toBeGreaterThan(0);
      });
    });

    it('초기 상품 목록을 가져올 때 로딩 상태를 보여준다', () => {
      const { result } = renderHook(() => useProducts(), { wrapper: ToastProvider });

      expect(result.current.isLoading).toBe(true);
    });
  });
});
