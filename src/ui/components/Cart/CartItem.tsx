import {woowaLogo} from "../../../assets";
import {
  CartContent,
  CartProduct,
  CartProductImage,
  DeleteButton,
  ProductDescription,
  ProductPrice,
  ProductTitle
} from "./Cart.styles";
import { CartItem as CartItemType } from "../../../types/product";

interface CartItemProps {
  cart: CartItemType;
}

function CartItem({cart}: CartItemProps) {
  const { product } = cart;
  const { name, price, imageUrl } = product;

  const imageSrc = imageUrl || woowaLogo;

  return (
    <CartProduct>
      <CartProductImage src={imageSrc}/>
      <CartContent>
        <ProductTitle>{name}</ProductTitle>
        <ProductPrice>{price.toLocaleString()}원</ProductPrice>
        <ProductDescription>버튼 추가</ProductDescription>
      </CartContent>
      <DeleteButton>삭제</DeleteButton>
    </CartProduct>
  );
}

export default CartItem;

