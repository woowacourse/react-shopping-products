import { Product } from '../src/appTypes/product';

import products from '../src/mocks/handlers/products/mockData';
import { waitFor } from '@testing-library/react';
import { createShoppingCartRenderHook } from './utils/createShoppingCartRenderHook';

describe('장바구니 테스트', () => {
  describe('장바구니 추가/삭제 테스트', () => {
    it('"담기" 버튼을 누르면 총 장바구니 갯수는 1개 증가한다.', async () => {
      const { result } = createShoppingCartRenderHook();

      const TARGET_MOCK_DATA: Product = products[0];
      const initShoppingCartItemLength = result.current.addedShoppingCartLength;

      await waitFor(() => {
        result.current.addShoppingCart(TARGET_MOCK_DATA.id);
      });

      expect(result.current.addedShoppingCartLength).toBe(initShoppingCartItemLength + 1);
    });

    it('"삭제" 버튼을 누르면 총 장바구니 갯수는 1개 감소한다.', async () => {
      const { result } = createShoppingCartRenderHook();

      const TARGET_MOCK_DATA: Product = products[0];
      const initShoppingCartItemLength = result.current.addedShoppingCartLength;

      await waitFor(() => {
        result.current.addShoppingCart(TARGET_MOCK_DATA.id);
      });

      await waitFor(() => {
        result.current.addShoppingCart(TARGET_MOCK_DATA.id);
      });

      await waitFor(() => {
        result.current.deleteShoppingCartItem(TARGET_MOCK_DATA.id);
      });

      expect(result.current.addedShoppingCartLength).toBe(initShoppingCartItemLength - 1);
    });
  });

  describe('장바구니 수량 변경 테스트', () => {
    it('"+" 버튼을 누를 경우, 해당 아이템의 수량이 1 증가한다.', async () => {
      const { result } = createShoppingCartRenderHook();

      const TARGET_MOCK_DATA: Product = products[0];

      await waitFor(() => {
        result.current.addShoppingCart(TARGET_MOCK_DATA.id);
      });

      await waitFor(() => {
        result.current.onIncreaseItemQuantity({
          id: result.current.cartItems[0].id,
          quantity: result.current.cartItems[0].quantity,
        });
      });

      await waitFor(() => {
        expect(result.current.cartItems[0].quantity).toBe(2);
      });
    });

    it('"-" 버튼을 누를 경우, 해당 아이템의 수량이 1 감소한다.', async () => {
      const { result } = createShoppingCartRenderHook();

      const TARGET_MOCK_DATA: Product = products[0];

      await waitFor(() => {
        result.current.addShoppingCart(TARGET_MOCK_DATA.id);
      });

      await waitFor(() => {
        result.current.onDecreaseItemQuantity({
          id: result.current.cartItems[0].id,
          quantity: result.current.cartItems[0].quantity,
        });
      });

      await waitFor(() => {
        expect(result.current.cartItems[0].quantity).toBe(0);
      });
    });
  });
});
