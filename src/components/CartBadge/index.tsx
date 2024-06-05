import Icon from "@/components/_common/Icon";
import * as S from "@/components/CartBadge/style";

const CartBadge = ({ cartItemLength }: { cartItemLength: number }) => {
  const cartItems = [];
  return (
    <S.Container>
      <Icon kind="cart" />
      {cartItems.length !== 0 && (
        <S.Badge>
          <S.BadgeNumber>{cartItemLength}</S.BadgeNumber>
        </S.Badge>
      )}
    </S.Container>
  );
};

export default CartBadge;
