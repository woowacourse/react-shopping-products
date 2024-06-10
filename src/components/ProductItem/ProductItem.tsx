import { useEffect, useState } from "react";
import { addCartItem, getCartItems } from "../../api/cart";
import { CART } from "../../constants";
import { useCart, useError } from "../../context";
import { useChangeCartItemQuantity } from "../../hooks";
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
      await fetchCartItemStatus();
      await fetchCartItems();
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
      if (quantity - 1 <= 0) {
        setIsInCart(false);
        setCartItemId(null);
        setQuantity(0);
      } else {
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
