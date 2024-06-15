import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import useFetchCart from './useFetchCart';

const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;

describe('useFetchAddCart', () => {
  it('장바구니에 담는 API를 호출하면 해당 제품의 id는 cartIdSet에 포함되어야 한다.', async () => {
    const PRODUCT_ID = 3;
    const { result } = renderHook(useFetchCart, { wrapper });

    act(() => {
      result.current.addProductToCart(PRODUCT_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems?.filter((item) => item.product.id === PRODUCT_ID).length).toBe(1);
    });
  });
  it('장바구니에서 삭제하는 API를 호출하면 해당 제품의 id는 cartIdSet에서 삭제되어야 한다.', async () => {
    const PRODUCT_ID = 3;
    const { result } = renderHook(useFetchCart, { wrapper });

    await act(async () => {
      await result.current.addProductToCart(PRODUCT_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems?.filter((item) => item.product.id === PRODUCT_ID).length).toBe(1);
    });

    const CART_ID = result.current.cartItems!.find((item) => item.product.id === PRODUCT_ID)!.id;

    await act(async () => {
      await result.current.deleteToRemoveCart(CART_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems?.filter((item) => item.product.id === PRODUCT_ID).length).toBe(0);
    });
  });

  it('장바구니에 담겨있는 제품을 삭제하면 장바구니에 담긴 제품 종류 개수가 감소되어야 한다.', async () => {
    const { result } = renderHook(useFetchCart, { wrapper });
    const PRODUCT_ID = 3;

    await act(async () => {
      await result.current.addProductToCart(PRODUCT_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems?.length).toBe(1);
    });

    const CART_ID = result.current.cartItems!.find((item) => item.product.id === PRODUCT_ID)!.id;

    await waitFor(() => {
      result.current.deleteToRemoveCart(CART_ID);
    });

    expect(result.current.cartItems?.length).toBe(0);
  });

  it('장바구니에 제품을 추가하고 장바구니를 다시 불러왔을 때, 해당 제품이 포함되어 있어야한다.', async () => {
    const PRODUCT_ID = 3;
    const { result } = renderHook(useFetchCart, { wrapper });

    act(() => {
      result.current.addProductToCart(PRODUCT_ID);
    });

    await waitFor(async () => {
      expect(result.current.cartItems?.some((item) => item.product.id === PRODUCT_ID)).toBe(true);
    });
  });

  it('장바구니에 제품을 두 개 추가하고 장바구니를 다시 불러왔을 때, 해당 제품들이 포함되어 있어야한다.', async () => {
    const PRODUCT_ID_TWO = 2;
    const PRODUCT_ID_THREE = 3;
    const { result } = renderHook(useFetchCart, { wrapper });

    await act(async () => {
      await result.current.addProductToCart(PRODUCT_ID_TWO);
    });

    await act(async () => {
      await result.current.addProductToCart(PRODUCT_ID_THREE);
    });

    expect(result.current.cartItems?.some((item) => item.product.id === PRODUCT_ID_TWO)).toBe(true);
    expect(result.current.cartItems?.some((item) => item.product.id === PRODUCT_ID_THREE)).toBe(true);
  });
});
