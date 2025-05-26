import shoppingBagIcon from "../../../assets/shoppingBagIcon.png";
import CountBox from "../CountBox/CountBox";
import {
  StyledHeader,
  StyledSpan,
  StyledButton,
  StyledImg,
  StyledCountText,
} from "./Header.styles";

interface HeaderProps {
  cartItemCount: number;
  status: "idle" | "loading" | "success" | "error";
}

export default function Header({ cartItemCount, status }: HeaderProps) {
  return (
    <StyledHeader>
      <StyledSpan>SHOP</StyledSpan>
      <StyledButton type="button">
        <StyledImg src={shoppingBagIcon} alt="shoppingBagIcon" />
        {status === "success" && (
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
