import Icon from "@/components/_common/Icon";
import * as S from "@/components/CartBadge/style";
import { CartItemContext } from "@/provider/cartItemProvider";
import { useContext } from "react";
const CartBadge = () => {
  const cartItems = useContext(CartItemContext);
  console.log(cartItems);
  return (
    <S.Container>
      <Icon kind="cart" />
      <S.Badge>
        <S.BadgeNumber>{cartItems.length}</S.BadgeNumber>
      </S.Badge>
    </S.Container>
  );
};

export default CartBadge;
