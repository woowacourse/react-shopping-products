import { useCartItemQuantity } from '@hooks/index';

import CountButton from '../CountButton';
import { CartActionErrorModal } from '../Fallbacks';

import style from './style.module.css';

interface QuantityControlProps {
  quantity: number;
  cartItemId: number;
}

const QuantityControl = ({ quantity, cartItemId }: QuantityControlProps) => {
  const { mutate: quantityMutate, error, isPending } = useCartItemQuantity();

  const increaseQuantity = () => {
    quantityMutate({ cartItemId, quantity: quantity + 1 });
  };

  const decreaseQuantity = () => {
    quantityMutate({ cartItemId, quantity: quantity - 1 });
  };

  return (
    <>
      <div className={style.quantityControl}>
        <CountButton quantitySign="minus" disabled={isPending} onClick={decreaseQuantity} />
        <span className="text">{quantity}</span>
        <CountButton quantitySign="plus" disabled={isPending} onClick={increaseQuantity} />
      </div>
      <CartActionErrorModal error={error} />
    </>
  );
};

export default QuantityControl;
