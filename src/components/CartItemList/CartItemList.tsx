import CartItemContainer from "../CartItemContainer/CartItemContainer";
import * as S from "./CartItemList.style";

import type { CartItem } from "../../interfaces/CartItem";
import useFetchCartItem from "../../hooks/useFetchCartItem";
import { EmptyCart } from "../../assets";
import useCartItemMutations from "../../hooks/useCartItemMutations";

function CartItemList({ style }: { style: React.CSSProperties }) {
  const { cartItemList, fetchError: cartItemListError } = useFetchCartItem();

  const { deleteCartItem, updateCartItemQuantity } = useCartItemMutations();

  if (cartItemListError) {
    throw cartItemListError;
  }

  if (!cartItemList || cartItemList.length === 0) {
    return (
      <S.EmptyCartContainer style={style}>
        <S.EmptyCartImage src={EmptyCart} alt="Empty Cart" />
        <S.EmptyCartMessage>장바구니가 비어 있습니다.</S.EmptyCartMessage>
      </S.EmptyCartContainer>
    );
  }

  return (
    <S.Layout style={style}>
      {cartItemList.map((el: CartItem) => (
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
