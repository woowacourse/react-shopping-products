import Icon from "@/components/_common/Icon";
import * as S from "@/components/CartBadge/style";
const CartBadge = () => {
  const itemCount = 2;

  return (
    <S.Container>
      <Icon kind="cart" />
      <S.Badge>
        <S.BadgeNumber>{itemCount}</S.BadgeNumber>
      </S.Badge>
    </S.Container>
  );
};

export default CartBadge;
