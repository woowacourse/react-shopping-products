import { MAX_QUANTITY } from '@constants/index';
import { useChangeCartItemQuantity } from '@hooks/index';
import { useEffect, useState } from 'react';

import CountButton from '../CountButton';
import { CartActionErrorModal } from '../Fallbacks';

import QuantityLimitModal from './QuantityLimitModal';
import style from './style.module.css';

interface QuantityControlProps {
  quantity: number;
  cartItemId: number;
}

const QuantityControl = ({ quantity, cartItemId }: QuantityControlProps) => {
  const { mutateAsync: quantityMutate, error, isPending } = useChangeCartItemQuantity();
  const [isTryOverMaxQuantity, setIsTryOverMaxQuantity] = useState(false);

  const isMaxQuantity = quantity === MAX_QUANTITY;

  const increaseQuantity = () => {
    setIsTryOverMaxQuantity(isMaxQuantity);
    if (isMaxQuantity) return;

    quantityMutate({ cartItemId, quantity: quantity + 1 });
  };

  const decreaseQuantity = () => {
    setIsTryOverMaxQuantity(false);
    quantityMutate({ cartItemId, quantity: quantity - 1 });
  };

  useEffect(() => {
    return () => {
      setIsTryOverMaxQuantity(false);
    };
  }, []);

  return (
    <>
      <div className={style.quantityControl}>
        <CountButton quantitySign="minus" disabled={isPending} onClick={decreaseQuantity} />
        <span className="text">{quantity}</span>
        <CountButton quantitySign="plus" disabled={isPending} onClick={increaseQuantity} />
      </div>
      <CartActionErrorModal error={error} />
      <QuantityLimitModal
        isTryOverMaxQuantity={isTryOverMaxQuantity}
        setIsTryOverMaxQuantity={setIsTryOverMaxQuantity}
      />
    </>
  );
};

export default QuantityControl;
