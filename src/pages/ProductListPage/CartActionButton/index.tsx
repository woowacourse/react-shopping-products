import { CartItem } from '@appTypes/index';
import { QuantityControl } from '@components/index';

import CartActionErrorModal from '../../../components/Fallbacks/CartActionError';
import CartAddButton from '../CartAddButton';
import style from './style.module.css';

interface CartActionButtonProps {
  productId: number;
  cartItem: CartItem | null;
}

const CartActionButton = ({ productId, cartItem }: CartActionButtonProps) => {
  //장바구니
  // const { refreshCartItemIds, cartItemIds } = useTargetContext(CartItemsContext);
  // const { addCartItem, error: cartActionError } = useCartAction({ refreshCartItemIds });
  const className = `${style.cartActionButton} ${cartItem ? style.quantity : style.add} `;
  const addCartItem = (productId: number) => {};
  return (
    <div className={className}>
      {/* {cartItem ? (
        <QuantityControl cartItemId={cartItem.id} quantity={cartItem.quantity} />
      ) : (
        <CartAddButton onClick={() => addCartItem(productId)} />
      )} */}
      <CartActionErrorModal error={false} />
    </div>
  );
};

export default CartActionButton;
