import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import useNewCartItemList, { CART_ITEM_PAGE } from './useNewCartItemList';
import { act } from 'react';
import cartItemListJSONData from '../mocks/datas/cartItemList.json';
import { ResponseCartItemList } from '@/apis/responseTypes';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const cartItemListData = cartItemListJSONData as ResponseCartItemList;
const cartItem = cartItemListData.content[0];

describe('useCartItemListss', () => {
  it(`첫 페이지의 장바구니 목록 ${CART_ITEM_PAGE.SIZE}개를 불러온다.`, async () => {
    const { result } = renderHook(() => useNewCartItemList(), { wrapper });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    await waitFor(() => expect(result.current.data).toHaveLength(CART_ITEM_PAGE.SIZE));
  });

  describe('상품이 장바구니에 있는지 확인', () => {
    it('상품 아이디에 해당하는 상품이 현재 장바구니에 있다.', () => {
      const { result } = renderHook(() => useNewCartItemList(), { wrapper });
      const productId = 10;

      expect(result.current.isInCart(productId)).toBe(true);
    });

    it('상품 아이디에 해당하는 상품이 현재 장바구니에 없다.', () => {
      const { result } = renderHook(() => useNewCartItemList(), { wrapper });
      const productId = 324;

      expect(result.current.isInCart(productId)).toBe(false);
    });
  });

  it('상품 아이디에 해당하는 장바구니 아이디를 반환한다.', () => {
    const { result } = renderHook(() => useNewCartItemList(), { wrapper });
    const productId = cartItem.product.id;

    expect(result.current.getCartItemId(productId)).toBe(cartItem.id);
  });
});
