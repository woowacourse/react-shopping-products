import { Product, QuantityControlType } from "../../../types";
import * as Styled from "./ProductItem.style";

import { QuantityController, AddToCartButton } from "../../../components";
import { convertToLocaleAmount, validateProductImageUrl } from "../../../utils";
import { ORDER_QUANTITY_PER_PRODUCT } from "../../../constants";
import { EmptyProductImage } from "../../../assets";

interface ProductProps {
  product: Product;
  quantity: number;
  onAddToCart: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export default function ProductItem({
  product,
  quantity,
  onAddToCart,
  onUpdateQuantity,
}: ProductProps) {
  const handleAddToCart = () => {
    onAddToCart();
  };

  const handleChangeQuantity = (type: QuantityControlType) => {
    if (quantity) {
      const newQuantity =
        type === "increase"
          ? quantity + 1
          : Math.max(ORDER_QUANTITY_PER_PRODUCT.min - 1, quantity - 1);
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <Styled.ProductItemBox>
      <Styled.ProductImage
        $imageUrl={validateProductImageUrl(product.imageUrl) ? product.imageUrl : EmptyProductImage}
      />
      <Styled.ProductContentBox>
        <Styled.ProductDescriptionBox>
          <h2>{product.name}</h2>
          <span>{convertToLocaleAmount(product.price)}</span>
        </Styled.ProductDescriptionBox>
        <Styled.ProductFooter>
          {quantity > 0 && (
            <QuantityController
              quantity={quantity}
              onChangeQuantity={(type: QuantityControlType) => handleChangeQuantity(type)}
            />
          )}
          {quantity === 0 && <AddToCartButton onClick={handleAddToCart} />}
        </Styled.ProductFooter>
      </Styled.ProductContentBox>
    </Styled.ProductItemBox>
  );
}
