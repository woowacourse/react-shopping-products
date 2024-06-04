import { useCart } from "../../context/cartContext";
import { ShopButton } from "../Button";
import { CartButton } from "../Button/CartButton";
import { StyledHeader } from "./Header.styled";

export const Header = () => {
  const { quantity } = useCart();

  return (
    <StyledHeader>
      <ShopButton
        onClick={() => {
          window.location.reload();
        }}
      />
      <CartButton quantity={quantity} onClick={() => {}} />
    </StyledHeader>
  );
};
