import { renderHook, act, waitFor } from '@testing-library/react';
import { CartItemListProvider, useCartItemListContext } from './useCartItemList';
import cartItemList from '@/mocks/datas/cartItemList.json';
import ToastProvider from './useToast';

describe('useCartItemList에 대한 테스트 코드', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ToastProvider>
      <CartItemListProvider>{children}</CartItemListProvider>
    </ToastProvider>
  );

  it('초기에 장바구니 아이템을 fetch 해온다.', async () => {
    const { result } = renderHook(() => useCartItemListContext(), { wrapper });

    await waitFor(() => {
      expect(result.current.cartItemList).toHaveLength(cartItemList.length);
    });
  });

  it('장바구니에 아이템을 추가 할 수 있다.', async () => {
    const { result } = renderHook(() => useCartItemListContext(), { wrapper });

    await act(async () => {
      await result.current.toggleCartItem(101);
    });

    await waitFor(() => {
      expect(result.current.cartItemList).toHaveLength(cartItemList.length);
      expect(result.current.isInCart(3)).toBe(true);
    });
  });

  it('장바구니에 아이템을 제거 할 수 있다.', async () => {
    const { result } = renderHook(() => useCartItemListContext(), { wrapper });

    const initialItem = cartItemList[0];

    await waitFor(() => {
      expect(result.current.cartItemList).toHaveLength(cartItemList.length);
    });

    await act(async () => {
      await result.current.toggleCartItem(initialItem.product.id);
    });

    await waitFor(() => {
      expect(result.current.cartItemList).toHaveLength(cartItemList.length - 1);
      expect(result.current.isInCart(initialItem.product.id)).toBe(false);
    });
  });
});
