import { CartItem } from '@appTypes/index';
import CartItems from '@mocks/data/cartItems.json';

import CartItemCard from '../CartItemCard';

import style from './style.module.css';

const CartList = () => {
  return (
    <ul className={style.cartList}>
      {(CartItems as CartItem[]).map((cartItem) => (
        <CartItemCard cartItem={cartItem} />
      ))}
    </ul>
  );
};

export default CartList;
