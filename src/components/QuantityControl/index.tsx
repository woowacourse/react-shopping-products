import CountButton from '../CountButton';

import style from './style.module.css';

interface QuantityControlProps {
  quantity: number;
  cartItemId: number;
}

const QuantityControl = ({ quantity, cartItemId }: QuantityControlProps) => {
  const increaseQuantity = () => {};

  const decreaseQuantity = () => {};

  return (
    <div className={style.quantityControl}>
      <CountButton quantitySign="minus" />
      <span className="text">{quantity}</span>
      <CountButton quantitySign="plus" />
    </div>
  );
};

export default QuantityControl;
