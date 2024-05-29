import { renderHook, act, waitFor } from '@testing-library/react';
import { useCartItemList, CartItemListProvider } from './useCartItemList';
import { BASE_URL } from '@/apis/baseUrl';
import { ENDPOINT } from '@/apis/endpoints';

describe('useCartItemList에 대한 테스트 코드', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartItemListProvider>{children}</CartItemListProvider>
  );

  it('초기에 장바구니 아이템을 fetch 해온다.', async () => {
    const { result } = renderHook(() => useCartItemList(), { wrapper });

    await waitFor(() => {
      expect(result.current?.cartItemList).toHaveLength(2);
    });
  });

  it('장바구니의 아이템 개수를 반환한다.', () => {});

  it('장바구니에 아이템을 추가 할 수 있다.', () => {});

  it('장바구니에 아이템을 제거 할 수 있다.', () => {});
});
