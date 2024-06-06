import { useEffect } from "react";
import { CartActionButton } from "../Button/CartActionButton";
import {
  StyledContainer,
  StyledProductImg,
  StyledProductItem,
  StyledProductName,
  StyledProductPrice,
  StyledWrapper,
} from "./ProductItem.styled";
import { useCart } from "../../context/cartContext";
import useCartItems from "../../hooks/useCartItems";

export const ProductItem = ({
  id,
  imageUrl,
  name,
  price,
}: Pick<Product, "id" | "imageUrl" | "name" | "price">) => {
  const { cartItemsCount, handleAddCartItem, handleRemoveCartItem, isProductInCart } =
    useCartItems();
  const { setQuantity } = useCart();

  useEffect(() => {
    setQuantity(cartItemsCount);
  }, [cartItemsCount]);

  return (
    <StyledProductItem>
      <StyledProductImg src={imageUrl} alt={name} />
      <StyledContainer>
        <StyledWrapper>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{price}</StyledProductPrice>
        </StyledWrapper>
        <CartActionButton
          actionType={isProductInCart(id) ? "sub" : "add"}
          onClick={() => {
            isProductInCart(id) ? handleRemoveCartItem(id) : handleAddCartItem(id);
          }}
        />
      </StyledContainer>
    </StyledProductItem>
  );
};
