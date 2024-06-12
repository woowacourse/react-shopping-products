import { useCartItems } from "../../../hooks";
import { CartItemIcon } from "../../../assets";

import * as Styled from "./ProductPageHeader.style";

interface ProductPageHeaderProps {
  onClickCartButton: () => void;
}

export default function ProductPageHeader({ onClickCartButton }: ProductPageHeaderProps) {
  const { cartItems } = useCartItems();
  const cartItemsLength = cartItems.length;

  const handleClickCartButton = () => {
    if (cartItems.length > 0) {
      onClickCartButton();
    }
  };

  return (
    <>
      <Styled.Header>
        SHOP
        <Styled.CartButton onClick={handleClickCartButton}>
          <Styled.CartIcon
            src={CartItemIcon}
            alt="장바구니 아이콘"
          />
          {cartItemsLength > 0 && (
            <Styled.CartItemsNumber>{cartItemsLength}</Styled.CartItemsNumber>
          )}
        </Styled.CartButton>
      </Styled.Header>
    </>
  );
}
