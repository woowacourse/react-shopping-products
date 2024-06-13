import { useEffect } from "react";

import useCartItem from "../../hooks/cart-items/useCartItem";
import useToasts from "../../hooks/useToasts";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

import * as Styled from "../ProductPage.style";

interface ShopHeaderProps {
  openModal: () => void;
}

export default function ShopHeader({ openModal }: ShopHeaderProps) {
  const { addToast } = useToasts();
  const { cartItemLength, error } = useCartItem();

  useEffect(() => {
    if (error instanceof Error) {
      addToast(error.message);
    }
  }, [error, addToast]);

  return (
    <NavigationBar>
      <Styled.ShopHeader>
        SHOP
        <Styled.CartButton onClick={openModal} />
        {cartItemLength !== 0 && (
          <Styled.CartItemsNumber onClick={openModal}>{cartItemLength}</Styled.CartItemsNumber>
        )}
      </Styled.ShopHeader>
    </NavigationBar>
  );
}
