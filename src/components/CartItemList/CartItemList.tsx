import CartItemCard from '../CartItemCard/CartItemCard';
import { CartItem } from '../../types/type';

import * as S from './CartItemList.style';

interface CartItemListProp {
  cartItemList: CartItem[];
}

function CartItemList({ cartItemList }: CartItemListProp) {
  return (
    <S.CartItemList>
      {cartItemList.map((cartItem: CartItem) => {
        return <CartItemCard key={cartItem.id} cartItem={cartItem} />;
      })}
    </S.CartItemList>
  );
}

export default CartItemList;
