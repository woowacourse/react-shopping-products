import { CartItem } from '@appTypes/index';
import { QuantityControl } from '@components/index';
import { getSkeletonClassName } from '@utils/index';

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

const Skeleton = () => {
  return (
    <li className={getSkeletonClassName(style.cartItemCard)}>
      <div className={getSkeletonClassName(style.img)} />
      <div className={getSkeletonClassName(style.info)}>
        <p className={getSkeletonClassName(style.name)}></p>
        <p className={getSkeletonClassName(style.price)}></p>
      </div>
      <button className={getSkeletonClassName(style.deleteButton)}></button>
    </li>
  );
};

CartItemCard.Skeleton = Skeleton;

export default CartItemCard;
