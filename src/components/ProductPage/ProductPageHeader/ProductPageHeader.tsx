import { useCartItems } from "../../../hooks";

import * as Styled from "./ProductPageHeader.style";

interface ProductPageHeaderProps {
  onClickCartButton: () => void;
}

export default function ProductPageHeader({ onClickCartButton }: ProductPageHeaderProps) {
  const { cartItems } = useCartItems();
  const cartItemsLength = cartItems.length;

  return (
    <>
      <Styled.Header>
        SHOP
        <Styled.CartButton onClick={onClickCartButton}>
          {cartItemsLength !== 0 && (
            <Styled.CartItemsNumber>{cartItemsLength}</Styled.CartItemsNumber>
          )}
        </Styled.CartButton>
      </Styled.Header>
    </>
  );
}
