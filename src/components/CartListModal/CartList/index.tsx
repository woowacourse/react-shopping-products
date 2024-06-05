import { CartItem } from '@appTypes/index';
import { getSkeletonClassName } from '@utils/index';

import CartItemCard from '../CartItemCard';

import style from './style.module.css';

interface CartListProps {
  cartList: CartItem[] | undefined;
}

const CartList = ({ cartList }: CartListProps) => {
  return (
    <ul className={style.cartList}>
      {cartList ? (
        cartList.map((cartItem) => <CartItemCard key={cartItem.id} cartItem={cartItem} />)
      ) : (
        <div>장바구니가 비어있습니다.</div>
      )}
    </ul>
  );
};

const Skeleton = () => {
  const LENGTH = 2;

  return (
    <ul className={getSkeletonClassName(style.cartList)}>
      {Array.from({ length: LENGTH }, (index) => `cartItemCardSkeleton-${index}`).map((i) => (
        <CartItemCard.Skeleton key={i} />
      ))}
    </ul>
  );
};

CartList.Skeleton = Skeleton;

export default CartList;
