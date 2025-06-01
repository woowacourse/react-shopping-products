import { CartItemType } from "@/apis/cartItems/cartItem.type";
import * as S from "./CartItemList.styled";
import CartItem from "./CartItem";
import PlanetIcon from "@assets/images/planet-error.png";

interface CartItemListProps {
  cartItems: CartItemType[];
}

function CartItemList({ cartItems }: CartItemListProps) {
  if (cartItems.length === 0) {
    return (
      <S.EmptyCartItemList>
        <S.EmptyCartItemImage src={PlanetIcon} />
        장바구니에 상품이 없습니다.
      </S.EmptyCartItemList>
    );
  }

  return (
    <S.CartItemList>
      {cartItems.map(({ id, quantity, product }) => (
        <CartItem key={id} id={id} quantity={quantity} product={product} />
      ))}
    </S.CartItemList>
  );
}

export default CartItemList;
