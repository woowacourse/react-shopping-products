import { Product } from "../../../types";
import { ProductItem } from "../..";
import * as Styled from "./ProductItemContainer.style";
import { useCartItemQuantity, useCartItems } from "../../../hooks";

interface ProductItemContainerProps {
  products: Product[];
}

export default function ProductItemContainer({ products }: ProductItemContainerProps) {
  const { handleAddCartItem, handleRemoveCartItem } = useCartItems();
  const { getQuantity, updateQuantity } = useCartItemQuantity();

  const onAddCartItem = (productId: number) => {
    handleAddCartItem(productId);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveCartItem(productId);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  return (
    <Styled.ProductItemContainer>
      {products.map((product, index) => (
        <ProductItem
          key={`${product.id}-${index}`}
          product={product}
          quantity={getQuantity(product.id)}
          onAddToCart={() => onAddCartItem(product.id)}
          onUpdateQuantity={(newQuantity: number) => handleUpdateQuantity(product.id, newQuantity)}
        />
      ))}
    </Styled.ProductItemContainer>
  );
}
