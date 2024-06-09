import CartItemContainer from "../CartItemContainer/CartItemContainer";
import * as S from "./CartItemList.style";

import type { CartItem } from "../../interfaces/CartItem";
import useCartItem from "../../hooks/useCartItem";

function CartItemList({ style }: { style: React.CSSProperties }) {
  const { deleteCartItem, updateCartItemQuantity } = useCartItem();
  const { cartItemList } = useCartItem();
  return (
    <S.Layout style={style}>
      {cartItemList?.map((el: CartItem) => (
        <CartItemContainer
          key={el.id}
          item={el}
          onRemoveItem={() => deleteCartItem.mutate(el.id)}
          onUpdateQuantity={(cartItemId, quantity) =>
            updateCartItemQuantity.mutate({ cartItemId, quantity })
          }
        />
      ))}
    </S.Layout>
  );
}

export default CartItemList;
