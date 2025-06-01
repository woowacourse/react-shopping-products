import CountBox from "./CountBox";
import * as S from "../../styles/Layout/Header.styles";

interface HeaderProps {
  onOpenModal: () => void;
  cartStatus: "idle" | "loading" | "success" | "error";
  cartItemCount: number;
}

export default function Header({
  onOpenModal,
  cartStatus,
  cartItemCount,
}: HeaderProps) {
  return (
    <S.Header>
      <S.Span>SHOP</S.Span>
      <S.Button type="button" onClick={onOpenModal}>
        <S.Img src="/assets/shoppingBagIcon.png" alt="shoppingBagIcon" />
        {cartStatus === "success" && (
          <CountBox>
            <S.CountText data-testid="cart-count">{cartItemCount}</S.CountText>
          </CountBox>
        )}
      </S.Button>
    </S.Header>
  );
}
