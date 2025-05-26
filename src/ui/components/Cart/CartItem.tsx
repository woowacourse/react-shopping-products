import {woowaLogo} from "../../../assets";
import {
  CartContent,
  CartProduct,
  CartProductImage,
  DeleteButton,
  ProductPrice,
  ProductTitle,
  StepperContainer,
  StepperButton,
  StepperQuantity
} from "./Cart.styles";
import { CartItem as CartItemType } from "../../../types/product";
import { useState } from "react";

interface CartItemProps {
  cart: CartItemType;
  onUpdateQuantity?: (cartItemId: number, quantity: number) => Promise<void>;
  onRemoveItem?: (cartItemId: number) => Promise<void>;
}

function CartItem({cart, onUpdateQuantity, onRemoveItem}: CartItemProps) {
  const { id, product, quantity } = cart;
  const { name, price, imageUrl } = product;
  const [isLoading, setIsLoading] = useState(false);

  const imageSrc = imageUrl || woowaLogo;

  const handleIncreaseQuantity = async () => {
    if (!onUpdateQuantity || isLoading) return;
    setIsLoading(true);
    try {
      await onUpdateQuantity(id, quantity + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (!onUpdateQuantity || isLoading) return;
    if (quantity <= 1) {
      await handleRemove();
      return;
    }
    setIsLoading(true);
    try {
      await onUpdateQuantity(id, quantity - 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!onRemoveItem || isLoading) return;
    setIsLoading(true);
    try {
      await onRemoveItem(id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartProduct>
      <CartProductImage src={imageSrc}/>
      <CartContent>
        <ProductTitle>{name}</ProductTitle>
        <ProductPrice>{price.toLocaleString()}원</ProductPrice>
        <StepperContainer>
          <StepperButton onClick={handleDecreaseQuantity} disabled={isLoading}>
            −
          </StepperButton>
          <StepperQuantity>{quantity}</StepperQuantity>
          <StepperButton onClick={handleIncreaseQuantity} disabled={isLoading}>
            +
          </StepperButton>
        </StepperContainer>
      </CartContent>
      <DeleteButton onClick={handleRemove} disabled={isLoading}>
        삭제
      </DeleteButton>
    </CartProduct>
  );
}

export default CartItem;

