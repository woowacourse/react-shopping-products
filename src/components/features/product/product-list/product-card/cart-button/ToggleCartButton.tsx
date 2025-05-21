import { ComponentProps, useCallback } from 'react';
import { getShoppingCartData } from '../../../../../../api/getShoppingCartData';
import { useAPIDataContext } from '../../../../../../context/APIDataProvider';
import { postCartItem } from '../../../../../../api/postCartItem';
import { deleteCartItem } from '../../../../../../api/deleteCartItem';
import DeleteCartButton from './DeleteCartButton';
import AddCartButton from './AddCartButton';
import { showToast } from '../../../../../../utils/toast/showToast';

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

  const handleDeleteCart = useCallback(async () => {
    try {
      if (!cartListData) return;
      const item = cartListData.find(({ product }) => product.id === productId);
      const cartId = item?.id;
      if (!cartId) {
        return;
      }
      await deleteCartItem(cartId);
      cartRefetch();
    } catch (e) {
      showToast('장바구니에 삭제하는 데 실패했습니다.', 'error');
    }
  }, [cartListData, productId, cartRefetch]);
  if (!cartListData) {
    return null;
  }
  cartListData.forEach((cart) => {
    if (cart.product.id === productId) {
      cartInfo.cartId = cart.id;
      cartInfo.isInCart = true;
    }
  });

  return cartInfo.isInCart ? (
    <DeleteCartButton onDeleteCartClick={handleDeleteCart} {...props} />
  ) : (
    <AddCartButton onAddCartClick={handleAddCart} {...props} />
  );
}

export default ToggleCartButton;
