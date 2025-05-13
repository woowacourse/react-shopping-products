import {
    CartToggleButtonWrapper,
    CartToggleButtonText
  } from "../styles/CartToggleButton";
  import { IMAGE_PATH } from "../constants/imagePath";
  
  export type CartToggleButtonProps = {
    isInBascket: boolean;
  };
  
  const CartToggleButton = ({
    isInBascket,
  }: CartToggleButtonProps) => {
    const imageSrc = isInBascket
      ? IMAGE_PATH.SHOPPIN_CART_ADD
      : IMAGE_PATH.SHOPPIN_CART_REMOVE;
  
    return (
      <CartToggleButtonWrapper isInBascket={isInBascket}>
        <img src={imageSrc} alt='shopping_cart' />
        <CartToggleButtonText isInBascket={isInBascket}>{isInBascket ? '담기' : '빼기'}</CartToggleButtonText>
      </CartToggleButtonWrapper>
    );
  };
  
  export default CartToggleButton;
  