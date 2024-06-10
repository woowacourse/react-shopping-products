import { DeleteCartItemButton, QuantityController } from "../../../components";
import { ORDER_QUANTITY_PER_PRODUCT } from "../../../constants";
import { Product, QuantityControlType } from "../../../types";
import { convertToLocaleAmount } from "../../../utils";

import * as Styled from "./CartItem.style";

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemoveFromCart: () => void;
}

export default function CartItem({
  product,
  quantity,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartItemProps) {
  const handleChangeQuantity = (type: QuantityControlType) => {
    if (quantity) {
      const newQuantity =
        type === "increase"
          ? quantity + 1
          : Math.max(ORDER_QUANTITY_PER_PRODUCT.min - 1, quantity - 1);
      onUpdateQuantity(newQuantity);
    }
  };

  const handleClickDeleteButton = () => {
    onRemoveFromCart();
  };

  return (
    <Styled.CartItemContainer>
      <Styled.CartItemContent>
        <Styled.ProductContainer>
          <Styled.ProductImageBox
            src={product.imageUrl}
            alt={product.name}
          />
          <Styled.ProductInfoBox>
            <Styled.ProductName>{product.name}</Styled.ProductName>
            <Styled.ProductPrice>{convertToLocaleAmount(product.price)}</Styled.ProductPrice>
            <QuantityController
              quantity={quantity}
              onChangeQuantity={(type: QuantityControlType) => handleChangeQuantity(type)}
            />
          </Styled.ProductInfoBox>
        </Styled.ProductContainer>
        <Styled.ProductDeleteButtonBox>
          <DeleteCartItemButton
            type="button"
            buttonText="삭제"
            onClick={handleClickDeleteButton}
          />
        </Styled.ProductDeleteButtonBox>
      </Styled.CartItemContent>
    </Styled.CartItemContainer>
  );
}
