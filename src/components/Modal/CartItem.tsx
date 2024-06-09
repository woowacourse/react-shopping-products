import { BaseButton } from "../Button";
import { CountButton } from "../Button/CountButton";
import {
  Container,
  Img,
  ProductItemBundle,
  ButtonText,
  ProductItemContent,
  ProductItemName,
  ProductItemPrice,
  ProductCount,
  ProductItemAmountGroup,
} from "./CartItem.styled";
import useCartItems from "../../hooks/useCartItems";

export const CartItem = ({ cartItem }: { cartItem: Cart }) => {
  const { cartItems, handleRemoveCartItem, handlePatchCartItem } = useCartItems();
  const targetCartItem = cartItems.find((item) => item.id === cartItem.id);
  const productCount = targetCartItem ? targetCartItem.quantity : 1;

  const handleIncrement = async () => {
    try {
      const newQuantity = productCount + 1;
      handlePatchCartItem(cartItem.product.id, newQuantity);
    } catch (error) {
      console.error("Failed to increment cart item productCount:", error);
    }
  };

  const handleDecrement = async () => {
    try {
      if (productCount === 1) return;

      const newQuantity = Math.max(productCount - 1, 1);
      handlePatchCartItem(cartItem.product.id, newQuantity);
    } catch (error) {
      console.error("Failed to decrement cart item productCount:", error);
    }
  };

  return (
    <Container>
      <ProductItemBundle>
        <Img
          src={cartItem.product.imageUrl}
          alt={`${cartItem.product.name}의 상품 사진`}
          className="product-item_img"
        />
        <ProductItemContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ProductItemName>{cartItem.product.name}</ProductItemName>
            <ProductItemPrice>{cartItem.product.price.toLocaleString()}원</ProductItemPrice>
          </div>

          <ProductItemAmountGroup>
            <CountButton type="minus" onClick={handleDecrement} />
            <ProductCount>{productCount}</ProductCount>
            <CountButton type="plus" onClick={handleIncrement} />
          </ProductItemAmountGroup>
        </ProductItemContent>
      </ProductItemBundle>
      <BaseButton onClick={() => handleRemoveCartItem(cartItem.product.id)}>
        <ButtonText>삭제</ButtonText>
      </BaseButton>
    </Container>
  );
};
