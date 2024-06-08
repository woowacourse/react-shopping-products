import { useEffect } from "react";
import { CartActionButton } from "../Button/CartActionButton";
import {
  StyledContainer,
  StyledProductImg,
  StyledProductItem,
  StyledProductName,
  StyledProductPrice,
  StyledWrapper,
  ProductItemBundle,
  ProductItemControls,
  ProductItemQuantity,
} from "./ProductItem.styled";
import { useCart } from "../../context/cartContext";
import useCartItems from "../../hooks/useCartItems";
import { CountButton } from "../Button/CountButton";

export const ProductItem = ({ product }: { product: Product }) => {
  const {
    cartItems,
    cartItemsCount,
    handleAddCartItem,
    handleRemoveCartItem,
    handlePatchCartItem,
    isProductInCart,
  } = useCartItems();
  const { setQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const productCount = cartItem ? cartItem.quantity : 1;

  const handleIncrement = async () => {
    try {
      const newQuantity = productCount + 1;
      handlePatchCartItem(product.id, newQuantity);
    } catch (error) {
      console.error("Failed to increment cart item productCount:", error);
    }
  };

  const handleDecrement = async () => {
    try {
      if (productCount === 1) return;

      const newQuantity = Math.max(productCount - 1, 1);
      handlePatchCartItem(product.id, newQuantity);
    } catch (error) {
      console.error("Failed to decrement cart item productCount:", error);
    }
  };

  useEffect(() => {
    setQuantity(cartItemsCount);
  }, [cartItemsCount]);

  const handleCartButtonClick = async () => {
    if (isProductInCart(product.id)) {
      handleRemoveCartItem(product.id);
    } else {
      handleAddCartItem(product.id);
    }
  };

  return (
    <StyledProductItem>
      <StyledProductImg src={product.imageUrl} alt={product.name} />
      <StyledContainer>
        <StyledWrapper>
          <StyledProductName>{product.name}</StyledProductName>
          <StyledProductPrice>{product.price}</StyledProductPrice>
        </StyledWrapper>

        {isProductInCart(product.id) ? (
          <ProductItemBundle>
            <ProductItemControls>
              <CountButton type="minus" onClick={handleDecrement} />
              <ProductItemQuantity>{productCount}</ProductItemQuantity>
              <CountButton type="plus" onClick={handleIncrement} />
            </ProductItemControls>
          </ProductItemBundle>
        ) : (
          <CartActionButton actionType="add" onClick={handleCartButtonClick} />
        )}
      </StyledContainer>
    </StyledProductItem>
  );
};
