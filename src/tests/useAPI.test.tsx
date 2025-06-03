import { renderHook, waitFor } from '@testing-library/react';
import { APIProvider } from '../context/APIContext';
import { useAPI } from '../hooks/useAPI';
import { CartItem, ProductElement } from '../types/type';
import { describe, it, expect } from 'vitest';
import { ToastProvider } from '../context/ToastContext';
import { fetchProductList } from '../utils/getProductList';
import { fetchCartItem } from '../utils/getCartItem';
import { API_CONFIG } from '../constants/APIConfig';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <APIProvider>{children}</APIProvider>
  </ToastProvider>
);

describe('useAPI with MSW', () => {
  it('상품 데이터를 성공적으로 받아온다', async () => {
    const { result } = renderHook(
      () =>
        useAPI<ProductElement[]>({
          fetcher: fetchProductList,
          name: API_CONFIG.PRODUCT_NAME,
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.length).toBe(50);
  });

  it('장바구니 데이터를 성공적으로 받아온다', async () => {
    const { result } = renderHook(
      () =>
        useAPI<CartItem[]>({
          fetcher: fetchCartItem,
          name: API_CONFIG.CART_NAME,
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.length).toBe(5);
  });
});
