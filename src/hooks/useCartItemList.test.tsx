import { renderHook, act, waitFor } from '@testing-library/react';
import useCartItemListContext from './useCartItemListContext';
import cartItemListData from '@/mocks/cartItemList.json';
import CartItemProvider from '@/provider/CartItemProvider';

describe('useCartItemList에 대한 테스트 코드', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartItemProvider>{children}</CartItemProvider>
  );
  it('초기에 장바구니 아이템을 fetch 해온다.', async () => {
    const { result } = renderHook(() => useCartItemListContext(), { wrapper });
    await waitFor(() => {
      expect(result.current.cartItemList).toHaveLength(cartItemListData.length);
    });
  });

  it('장바구니에 아이템을 추가한다.', async () => {
    const { result } = renderHook(() => useCartItemListContext(), { wrapper });

    act(() => {
      result.current.toggleCartItem(cartItemListData[0].product.id);
    });

    await waitFor(() => {
      expect(result.current.cartItemList).toContainEqual(cartItemListData[0]);
    });
  });

  it('장바구니에서 아이템을 제거한다.', async () => {
    const { result } = renderHook(() => useCartItemListContext(), { wrapper });

    act(() => {
      result.current.toggleCartItem(cartItemListData[0].product.id);
    });

    await waitFor(() => {
      expect(result.current.cartItemList).not.toContainEqual(cartItemListData[0]);
    });
  });
});
