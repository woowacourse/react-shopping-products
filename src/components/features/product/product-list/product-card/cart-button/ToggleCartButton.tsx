import { ComponentProps, useCallback } from 'react';

import {
  deleteCartItem,
  getShoppingCartData,
  patchCartItem,
  postCartItem,
} from '../../../../../../api/cart';
import { useAPIDataContext } from '../../../../../../context/APIDataProvider';
import { showToast } from '../../../../../../utils/toast/showToast';
import Counter from '../../../../../common/Counter';
import AddCartButton from './AddCartButton';

interface ToggleCartButtonProps extends ComponentProps<'button'> {
  productId: string;
}

function ToggleCartButton({ productId, ...props }: ToggleCartButtonProps) {
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });

  const cartInfo = {
    cartId: '',
    isInCart: false,
  };

  const handleAddCart = useCallback(async () => {
    try {
      if (!cartListData) return;
      if (cartListData.length >= 50) {
        return;
      }
      await postCartItem(productId);
      cartRefetch();
    } catch (e) {
      showToast('장바구니에 추가하는 데 실패했습니다.', 'error');
    }
  }, [cartListData, productId, cartRefetch]);

  const handlePlusQuantity = useCallback(
    async (cartId: string) => {
      try {
        if (!cartListData) return;
        const cart = cartListData.find((cart) => cart.id === cartId);
        if (!cart) throw new Error('장바구니에 해당 아이템이 없습니다.');
        await patchCartItem(cartId, cart.quantity + 1);
        await cartRefetch();
      } catch (e) {
        showToast('장바구니에 추가하는 데 실패했습니다.', 'error');
      }
    },
    [cartListData, cartRefetch]
  );

  const handleMinusQuantity = useCallback(
    async (cartId: string) => {
      try {
        if (!cartListData || cartListData.length >= 50) return;
        const cart = cartListData.find((cart) => cart.id === cartId);
        if (!cart) throw new Error('장바구니에 해당 아이템이 없습니다.');
        if (cart.quantity === 1) await deleteCartItem(cartId);
        if (cart.quantity > 1) await patchCartItem(cartId, cart.quantity - 1);
        await cartRefetch();
      } catch (e) {
        showToast('장바구니에서 뺴는 데 실패했습니다.', 'error');
      }
    },
    [cartListData, cartRefetch]
  );

  if (!cartListData) {
    return null;
  }

  cartListData.forEach((cart) => {
    if (cart.product.id === productId) {
      cartInfo.cartId = cart.id;
      cartInfo.isInCart = true;
    }
  });

  const itemQuantity = cartListData.find(
    (cart) => cart.product.id === productId
  )?.quantity;

  return cartInfo.isInCart ? (
    <Counter
      canBeZero={true}
      count={itemQuantity || 0}
      onMinusClick={() => handleMinusQuantity(cartInfo.cartId)}
      onPlusClick={() => handlePlusQuantity(cartInfo.cartId)}
      {...props}
    />
  ) : (
    <AddCartButton onAddCartClick={handleAddCart} {...props} />
  );
}

export default ToggleCartButton;
