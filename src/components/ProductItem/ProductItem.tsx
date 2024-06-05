import { useEffect, useState } from "react";
import { addCartItem, getCartItems, removeCartItem } from "../../api/cart";
import { formatPrice } from "../../utils/format";
import { CartActionButton } from "../Button";
import {
  StyledContainer,
  StyledProductImg,
  StyledProductItem,
  StyledProductName,
  StyledProductPrice,
  StyledWrapper,
} from "./ProductItem.styled";

export const ProductItem = ({
  id,
  imageUrl,
  name,
  price,
}: Pick<ProductProps, "id" | "imageUrl" | "name" | "price">) => {
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState<number | null>(null);

  const fetchCartItemStatus = async () => {
    try {
      const cartItems = await getCartItems();
      const cartItem = cartItems.find((item) => item.product.id === id);
      setIsInCart(!!cartItem);
      setCartItemId(cartItem ? cartItem.id : null);
    } catch (error) {
      console.error("Failed to fetch cart item status", error);
    }
  };

  useEffect(() => {
    fetchCartItemStatus();
  }, [id]);

  const handleButtonClick = async () => {
    try {
      if (isInCart) {
        if (cartItemId !== null) {
          await removeCartItem(cartItemId);
          setIsInCart(false);
          setCartItemId(null);
        }
      } else {
        await addCartItem(id, 1);
        await fetchCartItemStatus();
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
        <CartActionButton actionType={isInCart ? "sub" : "add"} onClick={handleButtonClick} />
      </StyledContainer>
    </StyledProductItem>
  );
};
