import { act, renderHook, waitFor } from '@testing-library/react';

import wrapper from '../../utils/testWrapper';
import useCartItems from '.';

describe('장바구니', () => {
  describe('addCart', () => {
    it('장바구니에 상품을 추가할 수 있다.', async () => {
      const { result } = renderHook(
        () => {
          const { addCart } = useCartItems();

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
          const { deleteCart } = useCartItems();

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
