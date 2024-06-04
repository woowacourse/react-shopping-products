import { useState } from "react";
import { addCartItem, removeCartItem } from "../../api/cart";
import { CartActionButton } from "../Button";
import {
  StyledContainer,
  StyledProductImg,
  StyledProductItem,
  StyledProductName,
  StyledProductPrice,
  StyledWrapper,
} from "./ProductItem.styled";
import { formatPrice } from "../../utils/format";

export const ProductItem = ({
  id,
  imageUrl,
  name,
  price,
}: Pick<ProductProps, "id" | "imageUrl" | "name" | "price">) => {
  const [isAddToCart, setIsAddToCart] = useState(false);

  const handleButtonClick = async () => {
    setIsAddToCart((prev) => !prev);
    try {
      if (isAddToCart) {
        await removeCartItem(id);
      } else {
        await addCartItem(id);
      }
    } catch (error) {
      console.error("Error handling cart action:", error);
    }
  };

  return (
    <StyledProductItem>
      <StyledProductImg src={imageUrl} alt="" />
      <StyledContainer>
        <StyledWrapper>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{formatPrice(price)}</StyledProductPrice>
        </StyledWrapper>
        <CartActionButton actionType={isAddToCart ? "sub" : "add"} onClick={handleButtonClick} />
      </StyledContainer>
    </StyledProductItem>
  );
};
