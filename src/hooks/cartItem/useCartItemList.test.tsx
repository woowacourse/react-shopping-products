import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import useCartItemList, { CART_ITEM_PAGE } from './useCartItemList';
import { act } from 'react';
import cartItemListJSONData from '../../mocks/datas/cartItemList.json';
import { ResponseCartItemList } from '@/apis/responseTypes';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const cartItemListData = cartItemListJSONData as ResponseCartItemList;
const cartItem = cartItemListData.content[0];

describe('useCartItemList', () => {
  it(`첫 페이지의 장바구니 목록 ${CART_ITEM_PAGE.SIZE}개를 불러온다.`, async () => {
    const { result } = renderHook(() => useCartItemList(), { wrapper });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    await waitFor(() => expect(result.current.data).toHaveLength(CART_ITEM_PAGE.SIZE));
  });

  it('장바구니에 담긴 상품들의 총 가격을 반환한다.', () => {
    const { result } = renderHook(() => useCartItemList(), { wrapper });
    const totalPrice = cartItemListData.content
      .slice(0, CART_ITEM_PAGE.SIZE)
      .reduce((sum, { quantity, product }) => sum + product.price * quantity, 0);

    expect(result.current.getTotalPrice()).toBe(totalPrice);
  });

  it('상품 아이디에 해당하는 장바구니 아이디를 반환한다.', () => {
    const { result } = renderHook(() => useCartItemList(), { wrapper });
    const productId = cartItem.product.id;

    expect(result.current.getCartItemId(productId)).toBe(cartItem.id);
  });

  it('해당 아이템이 장바구니에 담긴 수량을 반환한다.', () => {
    const { result } = renderHook(() => useCartItemList(), { wrapper });
    const productId = cartItem.product.id;

    expect(result.current.getCartItemQuantity(productId)).toBe(cartItem.quantity);
  });
});
