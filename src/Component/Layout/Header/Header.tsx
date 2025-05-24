import shoppingBagIcon from "../../../assets/shoppingBagIcon.png";
import { useCartContext } from "../../../domain/contexts/CartContext";
import CountBox from "../CountBox/CountBox";
import {
  StyledHeader,
  StyledSpan,
  StyledButton,
  StyledImg,
  StyledCountText,
} from "./Header.styles";

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  const { status, cartItems } = useCartContext();

  return (
    <StyledHeader>
      <StyledSpan>SHOP</StyledSpan>
      <StyledButton type="button" onClick={onOpenModal}>
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
