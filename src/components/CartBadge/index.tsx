import Icon from "@/components/_common/Icon";
import * as S from "@/components/CartBadge/style";
import { memo } from "react";

const CartBadge = ({ cartItemLength, onClick }: { cartItemLength: number; onClick: () => void }) => {
  return (
    <S.Container onClick={onClick}>
      <>
        <Icon kind="cart" />
        {cartItemLength !== 0 && (
          <S.Badge>
            <S.BadgeNumber>{cartItemLength}</S.BadgeNumber>
          </S.Badge>
        )}
      </>
    </S.Container>
  );
};

const MemoCartBage = memo(CartBadge, (prev, next) => {
  return prev.cartItemLength === next.cartItemLength;
});

export default MemoCartBage;
