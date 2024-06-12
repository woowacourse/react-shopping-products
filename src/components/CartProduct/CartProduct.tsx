import { Button, ProductQuantity } from "@/components";
import {
  Wrapper,
  CartProductImg,
  CartProductInfo,
  CartProductName,
  CartProductPrice,
} from "./CartProduct.style";
import { CartItem } from "@/types";
import { useMutationCartItem } from "@/hooks";

interface CartProductProps {
  cartItem: CartItem;
}

const CartProduct = ({ cartItem }: CartProductProps) => {
  const { handleDeleteCartItem } = useMutationCartItem();

  return (
    <Wrapper>
      <CartProductImg src={cartItem.product.imageUrl} />
      <CartProductInfo>
        <CartProductName>{cartItem.product.name}</CartProductName>
        <CartProductPrice>{cartItem.product.price}</CartProductPrice>
        <ProductQuantity cartItemId={cartItem.id} quantity={cartItem.quantity} />
        <Button
          theme="white"
          style={{
            width: "40px",
            height: "24px",
            fontSize: "12px",
            position: "absolute",
            top: 0,
            right: 0,
          }}
          onClick={() => handleDeleteCartItem(cartItem.id)}
        >
          삭제
        </Button>
      </CartProductInfo>
    </Wrapper>
  );
};

export default CartProduct;
