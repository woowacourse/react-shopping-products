import { useEffect, useState, useCallback, useContext } from 'react';
import { cartApi } from '../api/cart';
import { CartItem, Product } from '../types/common';
import { useToast } from '../component/@common/Toast/context/toastContext';
import ShoppingItemContext from '../context/shoppingItemContext/shoppingItemContext';

const useCart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const { openToast } = useToast();
  const { data } = useContext(ShoppingItemContext);

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = useCallback(async () => {
    try {
      const response = await cartApi.getCartItems();
      setCartData(response);
    } catch (error) {
      setCartData([]);
    }
  }, []);

  const addCart = useCallback(
    async (productId: number) => {
      try {
        const isSoldOut = checkProductQuantity(productId, data);

        if (isSoldOut) {
          throw new Error('상품의 재고가 없습니다.');
        }

        await cartApi.addToCart(productId);

        loadCartData();
        openToast('상품이 장바구니에 추가되었습니다.', true);
      } catch (error) {
        if (error instanceof Error) {
          openToast(error.message, false);
        } else {
          openToast('장바구니 담기에 실패했어요...', false);
        }
      }
    },
    [loadCartData, openToast, data]
  );

  const removeCart = useCallback(
    async (cartId: number) => {
      try {
        await cartApi.removeFromCart(cartId);

        await loadCartData();
        openToast('상품이 장바구니에서 제거되었습니다.', true);
      } catch (error) {
        openToast('장바구니 빼기에 실패했어요...', false);
      }
    },
    [loadCartData, openToast]
  );

  const patchCart = useCallback(
    async (cartItemId: number, quantity: number, productId: number) => {
      try {
        const isMaxQuantity = checkMaxQuantity(quantity, data, productId);
        if (isMaxQuantity) {
          throw new Error('최대 수량에 도달했습니다.');
        }
        await cartApi.patchCartItemQuantity(cartItemId, quantity);
        await loadCartData();
        openToast('장바구니 수량이 변경되었습니다.', true);
      } catch (error) {
        if (error instanceof Error) {
          openToast(error.message, false);
        } else {
          openToast('장바구니 수량 변경에 실패했어요...', false);
        }
      }
    },
    [loadCartData, openToast, data]
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

const checkProductQuantity = (productId: number, data: Product[]) => {
  return data?.find((item) => item.id === productId)?.quantity === 0;
};

const checkMaxQuantity = (
  quantity: number,
  data: Product[],
  productId: number
) => {
  const productQuantity = data.find((item) => item.id === productId)?.quantity;

  if (!productQuantity) return false;

  return quantity > productQuantity;
};
