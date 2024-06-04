import { useEffect, useState } from "react";
import { addCartItem, removeCartItem } from "../../api/cart";
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

export const ProductItem = ({
  id,
  imageUrl,
  name,
  price,
}: Pick<ProductProps, "id" | "imageUrl" | "name" | "price">) => {
  const [isAddToCart, setIsAddToCart] = useState(false);
  const { fetchCartCounts } = useCart();

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

  useEffect(() => {
    fetchCartCounts();
  }, [isAddToCart]);

  return (
    <StyledProductItem>
      <StyledProductImg src={imageUrl} alt={name} />
      <StyledContainer>
        <StyledWrapper>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{price}</StyledProductPrice>
        </StyledWrapper>
        <CartActionButton actionType={isAddToCart ? "sub" : "add"} onClick={handleButtonClick} />
      </StyledContainer>
    </StyledProductItem>
  );
};
