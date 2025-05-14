import {
    CartToggleButtonWrapper,
    CartToggleButtonText
  } from "../styles/CartToggleButton";
  import { IMAGE_PATH } from "../constants/imagePath";
  
  type CartToggleButtonProps = {
    id : number;
    isInBascket: boolean;
  };

  export type CartToggleButtonWrapperProps = {
    isInBascket: boolean;
  };
  
  const CartToggleButton = ({
    id, isInBascket,
  }: CartToggleButtonProps) => {
    const imageSrc = isInBascket
      ? IMAGE_PATH.SHOPPIN_CART_REMOVE
      : IMAGE_PATH.SHOPPIN_CART_ADD;
  
    return (
      <CartToggleButtonWrapper isInBascket={isInBascket}>
        <img src={imageSrc} alt='shopping_cart' />
        <CartToggleButtonText isInBascket={isInBascket}>{isInBascket ? '빼기' : '담기'}</CartToggleButtonText>
      </CartToggleButtonWrapper>
    );
  };
  
  export default CartToggleButton;
  