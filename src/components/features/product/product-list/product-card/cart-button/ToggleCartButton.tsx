import { ComponentProps, useCallback } from 'react';

import {
  deleteCartItem,
  getShoppingCartData,
  patchCartItem,
  postCartItem,
} from '../../../../../../api/cart';
import { useAPIDataContext } from '../../../../../../context/APIDataProvider';
import Counter from '../../../../../common/Counter';
import AddCartButton from './AddCartButton';
import { useToastContext } from '../../../../../../context/ToastProvider';

interface ToggleCartButtonProps extends ComponentProps<'button'> {
  productId: string;
}

function ToggleCartButton({ productId, ...props }: ToggleCartButtonProps) {
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });

  const { showToast } = useToastContext();

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

  const cart = cartListData.find((cart) => cart.product.id === productId);
  if (!cart)
    return (
      <AddCartButton
        onAddCartClick={handleAddCart}
        aria-label="장바구니 담기"
        {...props}
      />
    );

  const itemQuantity = cart.quantity;
  const productMaxQuantity = cart.product.quantity;

  return (
    <Counter
      canBeZero={true}
      count={itemQuantity || 0}
      maxCount={productMaxQuantity}
      onMinusClick={() => handleMinusQuantity(cart.id)}
      onPlusClick={() => handlePlusQuantity(cart.id)}
      {...props}
    />
  );
}

export default ToggleCartButton;
