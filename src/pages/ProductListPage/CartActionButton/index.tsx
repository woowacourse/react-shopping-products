import { QuantityControl } from '@components/index';
import { CartListContext } from '@contexts/index';
import { useTargetContext } from '@hooks/index';

import CartAddButton from '../CartAddButton';

import style from './style.module.css';

interface CartActionButtonProps {
  productId: number;
}

const CartActionButton = ({ productId }: CartActionButtonProps) => {
  const { cartListMap } = useTargetContext(CartListContext);

  const cartItem = cartListMap?.get(productId);

  const className = `${style.cartActionButton} ${cartItem ? style.quantity : style.add} `;

  return (
    <div className={className}>
      {cartItem ? (
        <QuantityControl cartItemId={cartItem.id} quantity={cartItem.quantity} />
      ) : (
        <CartAddButton productId={productId} />
      )}
    </div>
  );
};

export default CartActionButton;
