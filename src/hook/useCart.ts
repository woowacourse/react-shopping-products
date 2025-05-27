import { useEffect, useState, useCallback, useContext } from 'react';
import { CartItem, Product } from '../types/common';
import { useToast } from '../component/@common/Toast/context/toastContext';
import ShoppingItemContext from '../context/shoppingItemContext/shoppingItemContext';
import { cartService } from '../service/cart';

const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const { openToast } = useToast();
  const { data } = useContext(ShoppingItemContext);

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = useCallback(async () => {
    try {
      const response = await cartService.getCartItems();
      setCartData(response);
    } catch {
      setCartData([]);
    }
  }, []);

  const addCart = useCallback(
    async (productId: number) => {
      try {
        if (isSoldOut(productId, data)) {
          throw new Error('상품의 재고가 없습니다.');
        }

        const response = await cartService.addCartItem(productId);

        setCartData(response);
        openToast('상품이 장바구니에 추가되었습니다.', true);
      } catch (error) {
        if (error instanceof Error) {
          openToast(error.message, false);
        } else {
          openToast('장바구니 담기에 실패했어요...', false);
        }
      }
    },
    [openToast, data]
  );

  const removeCart = useCallback(
    async (cartId: number) => {
      try {
        const response = await cartService.removeCartItem(cartId);

        setCartData(response);
        openToast('상품이 장바구니에서 제거되었습니다.', true);
      } catch {
        openToast('장바구니 빼기에 실패했어요...', false);
      }
    },
    [openToast]
  );

  const patchCart = useCallback(
    async (cartItemId: number, quantity: number, productId: number) => {
      try {
        if (isMaxQuantity(quantity, data, productId)) {
          throw new Error('최대 수량에 도달했습니다.');
        }

        const response = await cartService.patchCartItemQuantity(
          cartItemId,
          quantity
        );

        setCartData(response);
        openToast('장바구니 수량이 변경되었습니다.', true);
      } catch (error) {
        if (error instanceof Error) {
          openToast(error.message, false);
        } else {
          openToast('장바구니 수량 변경에 실패했어요...', false);
        }
      }
    },
    [openToast, data]
  );

  return {
    cartData,
    loadCartData,
    addCart,
    removeCart,
    patchCart,
  };
};

export default useCart;

const isSoldOut = (productId: number, data: Product[]) => {
  return data?.find((item) => item.id === productId)?.quantity === 0;
};

const isMaxQuantity = (
  quantity: number,
  data: Product[],
  productId: number
) => {
  const productQuantity = data.find((item) => item.id === productId)?.quantity;

  if (!productQuantity) return false;

  return quantity > productQuantity;
};
