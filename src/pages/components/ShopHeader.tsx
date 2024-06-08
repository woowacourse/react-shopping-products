import useFetchCartItem from "../../hooks/cart-items/useFetchCartItem";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

import * as Styled from "../ProductPage.style";

interface ShopHeaderProps {
  openModal: () => void;
}

export default function ShopHeader({ openModal }: ShopHeaderProps) {
  const { cartItemLength } = useFetchCartItem();

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
