import { CartItem } from '@src/appTypes';
import QuantityControl from '@src/components/QuantityControl';

import style from './style.module.css';

interface CartItemCardProps {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: CartItemCardProps) => {
  return (
    <li className={style.cartItemCard}>
      <img className={style.img} src={cartItem.product.imageUrl} />

      <div className={style.info}>
        <p className={style.name}>{cartItem.product.name}</p>
        <p className={style.price}>{cartItem.product.price.toLocaleString()}</p>
        <QuantityControl cartItemId={cartItem.id} quantity={cartItem.quantity} />
      </div>
      <button className={style.deleteButton}>
        <span className="label">삭제</span>
      </button>
    </li>
  );
};

export default CartItemCard;
