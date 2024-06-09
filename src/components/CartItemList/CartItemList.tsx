import CartItemContainer from "../CartItemContainer/CartItemContainer";
import * as S from "./CartItemList.style";

import type { CartItem } from "../../interfaces/CartItem";
import useCartItem from "../../hooks/useCartItem";

function CartItemList() {
  const { deleteCartItem, updateCartItemQuantity } = useCartItem();
  const { cartItemList } = useCartItem();
  return (
    <S.Layout>
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
