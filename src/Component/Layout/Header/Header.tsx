import shoppingBagIcon from "../../../assets/shoppingBagIcon.png";
import useCartContext from "../../../domain/contexts/useCartContext";
import CountBox from "../CountBox/CountBox";
import {
  StyledHeader,
  StyledSpan,
  StyledButton,
  StyledImg,
  StyledCountText,
} from "./Header.styles";

export default function Header() {
  const { status, cartItems } = useCartContext();
  return (
    <StyledHeader>
      <StyledSpan>SHOP</StyledSpan>
      <StyledButton type="button">
        <StyledImg src={shoppingBagIcon} alt="shoppingBagIcon" />
        {status === "success" && (
          <CountBox>
            <StyledCountText data-testid="cart-count">
              {cartItems.length}
            </StyledCountText>
          </CountBox>
        )}
      </StyledButton>
    </StyledHeader>
  );
}
