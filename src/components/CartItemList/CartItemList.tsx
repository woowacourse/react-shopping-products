import * as S from './CartItemList.style';
import CartItemCard from '../CartItemCard/CartItemCard';
import { CartItem } from '../../types/type';

interface CartItemListProp {
  cartItemList: CartItem[];
}

const CartItemList = ({ cartItemList }: CartItemListProp) => {
  const reverseCartItemList = cartItemList.reverse();
  return (
    <S.CartItemList>
      {reverseCartItemList.map((cartItem: CartItem) => {
        return <CartItemCard key={cartItem.id} cartItem={cartItem} />;
      })}
    </S.CartItemList>
  );
};

export default CartItemList;
