import { useEffect, useState } from "react";
import { addCartItem, getCartItems, removeCartItem } from "../../api/cart";
import { useError } from "../../context/errorContext";
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
  const { setErrorStatus } = useError();

  const fetchCartItemStatus = async () => {
    try {
      const cartItems = await getCartItems();
      const cartItem = cartItems.find((item) => item.product.id === id);
      setIsInCart(!!cartItem);
      setCartItemId(cartItem ? cartItem.id : null);
    } catch (error) {
      setErrorStatus(error.response?.status);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addCartItem(id, 1);
      setIsInCart(true);
      await fetchCartItemStatus();
    } catch (error) {
      setErrorStatus(error.response?.status);
      setIsInCart(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (cartItemId === null) return;

    try {
      await removeCartItem(cartItemId);
      setIsInCart(false);
      setCartItemId(null);
    } catch (error) {
      setErrorStatus(error.response?.status);
      setIsInCart(true);
      setCartItemId(cartItemId);
    }
  };

  const handleButtonClick = async () => {
    if (isInCart) {
      await handleRemoveFromCart();
    } else {
      await handleAddToCart();
    }
  };

  useEffect(() => {
    fetchCartItemStatus();
  }, [id]);

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
