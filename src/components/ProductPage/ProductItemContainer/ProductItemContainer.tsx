import { Product } from "../../../types";
import { ProductItem } from "../..";
import * as Styled from "./ProductItemContainer.style";
import { useCartItems } from "../../../hooks";

interface ProductItemContainerProps {
  products: Product[];
}

export default function ProductItemContainer({ products }: ProductItemContainerProps) {
  const {
    handleAddCartItem,
    handleRemoveCartItem,
    getQuantityByProductId,
    updateQuantityByProductId,
  } = useCartItems();

  const onAddCartItem = (productId: number) => {
    handleAddCartItem(productId);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveCartItem(productId);
      return;
    }
    updateQuantityByProductId(productId, newQuantity);
  };

  return (
    <Styled.ProductItemContainer>
      {products.map((product, index) => (
        <ProductItem
          key={`${product.id}-${index}`}
          product={product}
          quantity={getQuantityByProductId(product.id)}
          onAddToCart={() => onAddCartItem(product.id)}
          onUpdateQuantity={(newQuantity: number) => handleUpdateQuantity(product.id, newQuantity)}
        />
      ))}
    </Styled.ProductItemContainer>
  );
}
