import Icon from "@/components/_common/Icon";
import * as S from "@/components/CartBadge/style";

const CartBadge = ({ onClick, count }: { onClick: () => void; count: number }) => {
  return (
    <S.Container onClick={onClick}>
      <>
        <Icon kind="cart" />
        {count !== 0 && (
          <S.Badge>
            <S.BadgeNumber>{count}</S.BadgeNumber>
          </S.Badge>
        )}
      </>
    </S.Container>
  );
};

export default CartBadge;
