import { useState } from "react";
import { useCart } from "../../context/cartContext";
import { ShopButton } from "../Button";
import { CartButton } from "../Button/CartButton";
import { CartModal } from "../Modal/CartModal";
import { StyledHeader } from "./Header.styled";

export const Header = () => {
  const { quantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledHeader>
      <ShopButton
        onClick={() => {
          window.location.reload();
        }}
      />
      <CartButton quantity={quantity} onClick={handleModalOpen} />
      {isOpen && <CartModal isOpen={isOpen} handleModalOpen={handleModalOpen} />}
    </StyledHeader>
  );
};
