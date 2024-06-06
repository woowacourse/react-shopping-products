import Icon from "@/components/_common/Icon";
import * as S from "@/components/CartBadge/style";

const CartBadge = ({ cartItemLength, onClick }: { cartItemLength: number; onClick: () => void }) => {
  return (
    <S.Container onClick={onClick}>
      <Icon kind="cart" />
      {<S.Badge>{cartItemLength && <S.BadgeNumber>{cartItemLength}</S.BadgeNumber>}</S.Badge>}
    </S.Container>
  );
};

export default CartBadge;
