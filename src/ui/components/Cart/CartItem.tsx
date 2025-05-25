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

interface CartItemProps {
  cart: CartItemType;
}

function CartItem({cart}: CartItemProps) {
  const { product, quantity } = cart;
  const { name, price, imageUrl } = product;

  const imageSrc = imageUrl || woowaLogo;

  return (
    <CartProduct>
      <CartProductImage src={imageSrc}/>
      <CartContent>
        <ProductTitle>{name}</ProductTitle>
        <ProductPrice>{price.toLocaleString()}원</ProductPrice>
        <StepperContainer>
          <StepperButton>−</StepperButton>
          <StepperQuantity>{quantity}</StepperQuantity>
          <StepperButton>+</StepperButton>
        </StepperContainer>
      </CartContent>
      <DeleteButton>삭제</DeleteButton>
    </CartProduct>
  );
}

export default CartItem;

