import { renderHook, waitFor } from '@testing-library/react';
import { useFetchCartItems } from '@/hooks/index';
import { cartItems } from '../../../src/mocks/data/index';
import { server } from '../../../src/mocks/server';
import { HttpResponse, http } from 'msw';
import { ENDPOINT } from '@/api/endpoints';
import { testQueryClient, queryClientWrapper } from '../../utils/test-utils';

describe('useFetchCartItems 테스트', () => {
  afterEach(() => {
    testQueryClient.clear();
  });

  it('장바구니 아이템들을 성공적으로 가져오면 데이터를 반환한다.', async () => {
    const { result } = renderHook(() => useFetchCartItems(), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() => {
      expect(result.current.cartItemList).toEqual(cartItems.content);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('장바구니 아이템들을 가져오는데 실패하면 에러 상태를 반환한다.', async () => {
    server.use(
      http.get(ENDPOINT.cartItem.getList, () => {
        return new HttpResponse('Internal Server Error', { status: 500 });
      }),
    );

    const { result } = renderHook(() => useFetchCartItems(), {
      wrapper: queryClientWrapper,
    });

    expect(result.current.cartItemList).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
