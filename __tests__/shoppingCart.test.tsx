import { Product } from '../src/appTypes/product';

import products from '../src/mocks/handlers/products/mockData';
import { renderHook, waitFor } from '@testing-library/react';
import useShoppingCart from '../src/hooks/cartItem/useShoppingCart';
import useAddShoppingCart from '../src/hooks/cartItem/useAddShoppingCart';
import useUpdateItemQuantity from '../src/hooks/cartItem/useUpdateItemQuantity';
import useDeleteCartItem from '../src/hooks/cartItem/useDeleteCartItem';
import { wrapper } from './utils/createProductsRenderHook';

describe('장바구니 테스트', () => {
  describe('장바구니 추가/삭제 테스트', () => {
    it('"담기" 버튼을 누르면 총 장바구니 갯수는 1개 증가한다.', async () => {
      const { result } = renderHook(
        () => {
          const { cartItems, addedShoppingCartLength } = useShoppingCart();
          const { addShoppingCart } = useAddShoppingCart();

          return { cartItems, addShoppingCart, addedShoppingCartLength };
        },
        { wrapper }
      );
      const TARGET_MOCK_DATA: Product = products[0];
      const initShoppingCartItemLength = result.current.addedShoppingCartLength;

      await waitFor(() => {
        result.current.addShoppingCart(TARGET_MOCK_DATA.id);
      });

      expect(result.current.addedShoppingCartLength).toBe(initShoppingCartItemLength + 1);
    });

    it('"삭제" 버튼을 누르면 총 장바구니 갯수는 1개 감소한다.', async () => {
      const { result } = renderHook(
        () => {
          const { cartItems, addedShoppingCartLength } = useShoppingCart();
          const { addShoppingCart } = useAddShoppingCart();
          const { deleteShoppingCartItem } = useDeleteCartItem();

          return { cartItems, addShoppingCart, deleteShoppingCartItem, addedShoppingCartLength };
        },
        { wrapper }
      );
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
      const { result } = renderHook(
        () => {
          const { cartItems, addedShoppingCartLength } = useShoppingCart();
          const { addShoppingCart } = useAddShoppingCart();
          const { mutate: updateItemQuantity } = useUpdateItemQuantity();

          return { cartItems, addShoppingCart, updateItemQuantity, addedShoppingCartLength };
        },
        { wrapper }
      );

      const TARGET_MOCK_DATA: Product = products[0];

      await waitFor(() => {
        result.current.addShoppingCart(TARGET_MOCK_DATA.id);
      });

      await waitFor(() => {
        result.current.updateItemQuantity({
          id: result.current.cartItems[0].id,
          quantity: result.current.cartItems[0].quantity + 1,
        });
      });

      await waitFor(() => {
        expect(result.current.cartItems[0].quantity).toBe(2);
      });
    });

    it('"-" 버튼을 누를 경우, 해당 아이템의 수량이 1 감소한다.', async () => {
      const { result } = renderHook(
        () => {
          const { cartItems, addedShoppingCartLength } = useShoppingCart();
          const { addShoppingCart } = useAddShoppingCart();
          const { mutate: updateItemQuantity } = useUpdateItemQuantity();

          return { cartItems, addShoppingCart, updateItemQuantity, addedShoppingCartLength };
        },
        { wrapper }
      );

      const TARGET_MOCK_DATA: Product = products[0];

      await waitFor(() => {
        result.current.addShoppingCart(TARGET_MOCK_DATA.id);
      });

      await waitFor(() => {
        result.current.updateItemQuantity({
          id: result.current.cartItems[0].id,
          quantity: result.current.cartItems[0].quantity - 1,
        });
      });

      await waitFor(() => {
        expect(result.current.cartItems[0].quantity).toBe(0);
      });
    });
  });
});
