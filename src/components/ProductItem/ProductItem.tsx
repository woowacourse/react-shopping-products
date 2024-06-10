import { useEffect, useState } from "react";
import { addCartItem, getCartItems } from "../../api/cart";
import { CART } from "../../constants";
import { useCart, useError } from "../../context";
import { useChangeCartItemQuantity } from "../../hooks";
import { formatPrice } from "../../utils/format";
import { CartActionButton, CounterButton } from "../Button";
import {
  StyledContainer,
  StyledProductImg,
  StyledProductItem,
  StyledProductName,
  StyledProductPrice,
  StyledProductQuantityContainer,
  StyledProductQuantityText,
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
  const [quantity, setQuantity] = useState<number>(0);
  const { setErrorStatus } = useError();
  const { fetchCartItems } = useCart();
  const { incrementQuantity, decrementQuantity } = useChangeCartItemQuantity();

  const fetchCartItemStatus = async () => {
    try {
      const items = await getCartItems();
      const cartItem = items.find((item) => item.product.id === id);
      setIsInCart(!!cartItem);
      setCartItemId(cartItem ? cartItem.id : null);
      setQuantity(cartItem ? cartItem.quantity : 0);
    } catch (error: any) {
      setErrorStatus(error.response?.status);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addCartItem(id, 1);
      setIsInCart(true);
      await fetchCartItems();
      await fetchCartItemStatus();
    } catch (error: any) {
      setErrorStatus(error.response?.status);
      setIsInCart(false);
    }
  };

  useEffect(() => {
    fetchCartItemStatus();
  }, [id, isInCart]);

  const handleIncrement = async () => {
    if (cartItemId) {
      await incrementQuantity({ id: cartItemId, quantity });
      setQuantity(quantity + CART.QUANTITY_CHANGE_STEP);
    }
  };

  const handleDecrement = async () => {
    if (cartItemId) {
      await decrementQuantity({ id: cartItemId, quantity });
      setQuantity(quantity - CART.QUANTITY_CHANGE_STEP);
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
        {isInCart ? (
          <StyledProductQuantityContainer>
            <CounterButton type="decrement" onClick={handleDecrement} />
            <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
            <CounterButton type="increment" onClick={handleIncrement} />
          </StyledProductQuantityContainer>
        ) : (
          <CartActionButton actionType="add" onClick={handleAddToCart} />
        )}
      </StyledContainer>
    </StyledProductItem>
  );
};
