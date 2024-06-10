import { useEffect, useState } from "react";
import { useCart, useError } from "../../context";
import { formatPrice } from "../../utils/format";
import { CartActionButton } from "../Button";
import { QuantityControls } from "../QuantityControl/QuantityControl";
import {
  StyledContainer,
  StyledProductImg,
  StyledProductItem,
  StyledProductName,
  StyledProductPrice,
  StyledQuantityControls,
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
  const { cartItems, addItemToCart, updateCartItemQuantity, removeCartItem } = useCart();

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.product.id === id);
    setIsInCart(!!cartItem);
    setCartItemId(cartItem ? cartItem.id : null);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItems, id]);

  const handleAddToCart = async () => {
    try {
      await addItemToCart(id, 1);
      setIsInCart(true);
    } catch (error: any) {
      setErrorStatus(error.response?.status);
      setIsInCart(false);
    }
  };

  const handleIncrement = async () => {
    if (cartItemId) {
      await updateCartItemQuantity(cartItemId, quantity + 1);
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = async () => {
    if (cartItemId) {
      if (quantity - 1 <= 0) {
        await removeCartItem(cartItemId);
        setIsInCart(false);
        setCartItemId(null);
        setQuantity(0);
      } else {
        await updateCartItemQuantity(cartItemId, quantity - 1);
        setQuantity(quantity - 1);
      }
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
          <StyledQuantityControls>
            <QuantityControls
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </StyledQuantityControls>
        ) : (
          <CartActionButton actionType="add" onClick={handleAddToCart} />
        )}
      </StyledContainer>
    </StyledProductItem>
  );
};
