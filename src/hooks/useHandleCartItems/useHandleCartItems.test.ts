import { act, renderHook, waitFor } from '@testing-library/react';

import wrapper from '../../utils/testWrapper';
import useHandleCartItems from '../useHandleCartItems';

describe('useHandleCartItems', () => {
  describe('addCart', () => {
    it('장바구니에 상품을 추가할 수 있다.', async () => {
      const { result } = renderHook(
        () => {
          const { addCart } = useHandleCartItems();

          return addCart;
        },
        { wrapper },
      );

      act(() => {
        result.current.mutate(1234);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });
  });

  describe('deleteCart', () => {
    it('장바구니에 상품을 삭제할 수 있다.', async () => {
      const { result } = renderHook(
        () => {
          const { deleteCart } = useHandleCartItems();

          return deleteCart;
        },
        { wrapper },
      );

      act(() => {
        result.current.mutate(1234);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });
  });
});
