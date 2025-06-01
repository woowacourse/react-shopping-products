import CountBox from "./CountBox";
import {
  StyledHeader,
  StyledSpan,
  StyledButton,
  StyledImg,
  StyledCountText,
} from "../../styles/Layout/Header.styles";

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
    <StyledHeader>
      <StyledSpan>SHOP</StyledSpan>
      <StyledButton type="button" onClick={onOpenModal}>
        <StyledImg src="/assets/shoppingBagIcon.png" alt="shoppingBagIcon" />
        {cartStatus === "success" && (
          <CountBox>
            <StyledCountText data-testid="cart-count">
              {cartItemCount}
            </StyledCountText>
          </CountBox>
        )}
      </StyledButton>
    </StyledHeader>
  );
}
