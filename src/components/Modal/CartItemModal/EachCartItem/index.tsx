import Stepper from '@components/Stepper';
import style from './style.module.css';
import { CartItem } from '@appTypes/cartItems';

interface EachCartItemProps {
  cartItem: CartItem;
}

function EachCartItem({ cartItem }: EachCartItemProps) {
  const onDelete = () => {};
  const handleIncrement = () => {};
  const handleDecrement = () => {};

  return (
    <div className={style.container}>
      <hr className={style.hr} />
      <button type="button" onClick={onDelete} className={style.button}>
        삭제
      </button>
      <div className={style.contents}>
        <img className={style.productImage} src={cartItem.product.imageUrl} alt="product" />
        <div className={style.description}>
          <p className={style.productName}>{cartItem.product.name}</p>
          <p className={`${style.price} text`}>{cartItem.product.price.toLocaleString()}원</p>
          <Stepper value={cartItem.quantity} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
        </div>
      </div>
    </div>
  );
}

export default EachCartItem;
