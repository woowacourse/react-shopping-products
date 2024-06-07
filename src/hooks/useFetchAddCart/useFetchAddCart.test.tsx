import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetchAddCart from './useFetchAddCart';
import useFetchCartItems from '../useFetchCartItems/useFetchCartItems';
import { Carts } from '../../types/fetch';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchAddCart', async () => {
  const PRODUCT_ID = 3;

  it('장바구니에 상품을 추가할 수 있다.', async () => {
    const { result } = renderHook(() => useFetchAddCart(), { wrapper });

    act(() => {
      result.current.addCartItem(PRODUCT_ID);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  // TODO: 장바구니 삭제 기능 추가 후 구현하기
  // it('장바구니에서 삭제하는 API를 호출하면 해당 제품의 id는 cartIdSet에서 삭제되어야 한다.', () => {
  //   const { result } = renderHook(() => useFetchAddCart(), { wrapper });

  //   act(() => {
  //     result.current.deleteToRemoveCart(PRODUCT_ID);
  //   });

  //   expect(result.current.cartIdSet.has(PRODUCT_ID)).toBe(false);
  // });

  it('장바구니에 담겨있지 않은 제품을 담으면 장바구니에 담긴 제품 종류 개수가 증가되어야 한다.', async () => {
    const { result } = renderHook(
      () => {
        const fetchCartItems = useFetchCartItems();
        const fetchAddCart = useFetchAddCart();
        return { fetchCartItems, fetchAddCart };
      },
      { wrapper },
    );

    expect(result.current.fetchCartItems.data).toHaveLength(0);

    act(() => {
      result.current.fetchAddCart.addCartItem(PRODUCT_ID);
    });

    await waitFor(() =>
      expect(result.current.fetchCartItems.data).toHaveLength(1),
    );
  });

  // TODO: 장바구니 삭제 기능 추가 후 구현하기
  // it('장바구니에 담겨있는 제품을 삭제하면 장바구니에 담긴 제품 종류 개수가 감소되어야 한다.', async () => {
  //   const { result } = renderHook(() => useFetchAddCart());

  //   await act(async () => {
  //     await result.current.postToAddCart(3);
  //   });

  //   expect(result.current.cartIdSet.size).toBe(1);

  //   await act(async () => {
  //     await result.current.deleteToRemoveCart(3);
  //   });

  //   expect(result.current.cartIdSet.size).toBe(0);
  // });

  it('장바구니에 제품을 추가하고 장바구니를 다시 불러왔을 때, 해당 제품이 포함되어 있어야한다.', async () => {
    const { result } = renderHook(
      () => {
        const fetchCartItems = useFetchCartItems();
        const fetchAddCart = useFetchAddCart();
        return { fetchCartItems, fetchAddCart };
      },
      { wrapper },
    );
    await waitFor(() => {
      result.current.fetchAddCart.addCartItem(PRODUCT_ID);
    });

    await waitFor(() => {
      result.current.fetchCartItems.refetch();
    });

    let cartItems: Carts[] = [];
    await waitFor(() => {
      cartItems = result.current.fetchCartItems.data;
    });

    await waitFor(() => {
      expect(cartItems.some((item) => item.product.id === PRODUCT_ID)).toBe(
        true,
      );
    });
  });

  it('장바구니에 제품을 두 개 추가하고 장바구니를 다시 불러왔을 때, 해당 제품들이 포함되어 있어야한다.', async () => {
    const PRODUCT_ID_TWO = 2;
    const PRODUCT_ID_THREE = 3;

    const { result } = renderHook(
      () => {
        const fetchCartItems = useFetchCartItems();
        const fetchAddCart = useFetchAddCart();
        return { fetchCartItems, fetchAddCart };
      },
      { wrapper },
    );
    await waitFor(() => {
      result.current.fetchAddCart.addCartItem(PRODUCT_ID_TWO);
      result.current.fetchAddCart.addCartItem(PRODUCT_ID_THREE);
    });

    await waitFor(() => {
      result.current.fetchCartItems.refetch();
    });

    let cartItems: Carts[] = [];
    await waitFor(() => {
      cartItems = result.current.fetchCartItems.data;
    });

    await waitFor(() => {
      expect(cartItems.some((item) => item.product.id === PRODUCT_ID_TWO)).toBe(
        true,
      );
      expect(
        cartItems.some((item) => item.product.id === PRODUCT_ID_THREE),
      ).toBe(true);
    });
  });
});
