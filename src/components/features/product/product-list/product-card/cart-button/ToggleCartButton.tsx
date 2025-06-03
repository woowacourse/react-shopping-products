import { ComponentProps } from 'react';

import {
  deleteCartItem,
  getShoppingCartData,
  patchCartItem,
  postCartItem,
} from '../../../../../../api/cart';
import { useAPIDataContext } from '../../../../../../context/APIDataProvider';
import { useToastContext } from '../../../../../../context/ToastProvider';
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

  const { showToast } = useToastContext();

  if (!cartListData) {
    return null;
  }

  const handleAddCart = async () => {
    try {
      if (cartListData.length >= 50) return;
      await postCartItem(productId);
      cartRefetch();
    } catch (e) {
      showToast('장바구니에 추가하는 데 실패했습니다.', 'error');
    }
  };

  const cart = cartListData.find((cart) => cart.product.id === productId);

  if (!cart)
    return (
      <AddCartButton
        onAddCartClick={handleAddCart}
        aria-label="장바구니 담기"
        {...props}
      />
    );

  const handlePlusQuantity = async (cartId: string) => {
    try {
      await patchCartItem(cartId, cart.quantity + 1);
      await cartRefetch();
    } catch (e) {
      showToast('장바구니에 추가하는 데 실패했습니다.', 'error');
    }
  };

  const handleMinusQuantity = async (cartId: string) => {
    try {
      if (cartListData.length < 1) return;
      if (cart.quantity === 1) await deleteCartItem(cartId);
      if (cart.quantity > 1) await patchCartItem(cartId, cart.quantity - 1);
      await cartRefetch();
    } catch (e) {
      showToast('장바구니에서 뺴는 데 실패했습니다.', 'error');
    }
  };

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
