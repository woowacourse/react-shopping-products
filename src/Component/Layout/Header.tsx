import CountBox from "./CountBox";
import getShoppingCart from "../../api/shoppingCart/getShoppingCart";
import { useAPI } from "../../domain/contexts/APIContext";
import {
  StyledHeader,
  StyledSpan,
  StyledButton,
  StyledImg,
  StyledCountText,
} from "../../styles/Layout/Header.styles";

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  const { data, status } = useAPI({
    fetcher: () => getShoppingCart(),
    name: "cart",
  });
  const cartCount = data?.content?.length ?? 0;
  return (
    <StyledHeader>
      <StyledSpan>SHOP</StyledSpan>
      <StyledButton type="button" onClick={onOpenModal}>
        <StyledImg src="/assets/shoppingBagIcon.png" alt="shoppingBagIcon" />
        {status === "success" && (
          <CountBox>
            <StyledCountText data-testid="cart-count">
              {cartCount}
            </StyledCountText>
          </CountBox>
        )}
      </StyledButton>
    </StyledHeader>
  );
}
