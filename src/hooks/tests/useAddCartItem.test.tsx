import { queryClient } from '@/App';
import { waitFor, renderHook, act } from '@testing-library/react';
import TestWrapper from './TestWrapper';
import useAddCartItem from '../useAddCartItem';
import { CART_ITEM_KEYS } from '@/queries/keys';
import ERROR_MESSAGE from '@/constants/errorMessage';
import toast from '@/services/toast';

const DEFAULT_TOAST_DURATION = 2_000;

describe('useAddCartItem 훅에 대한 테스트 코드 작성', () => {
  it('장바구니에 상품을 추가할수 있다..', async () => {
    const { result } = renderHook(() => useAddCartItem(), { wrapper: TestWrapper });

    act(() => {
      result.current.addCartItem(123);
    });

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: CART_ITEM_KEYS.ALL,
      });
    });
  });

  it('상품 추가가 실패하면 에러 토스트 메시지를 표시한다.', async () => {
    const toastErrorMock = jest.spyOn(toast, 'error');

    const { result } = renderHook(() => useAddCartItem(), { wrapper: TestWrapper });

    act(() => {
      result.current.addCartItem(1);
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith(
        ERROR_MESSAGE.FAIL_ADD_CART_ITEM,
        DEFAULT_TOAST_DURATION,
      );
    });
  });
});
