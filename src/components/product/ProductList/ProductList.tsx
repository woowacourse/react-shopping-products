import ProductItem from "../ProductItem/ProductItem";

import { Product as ProductType } from "../../../types/Product";

import * as Styled from "./ProductList.styled";

interface ProductListProps {
  selectedProductIdList: string[];
  productList: readonly ProductType[];
  handleAddProduct: (productId: string) => void;
  handleRemoveProduct: (productId: string) => void;
  handleIncreaseCartItemQuantity: (productId: string) => void;
}

function ProductList({
  selectedProductIdList,
  productList,
  handleAddProduct,
  handleRemoveProduct,
  handleIncreaseCartItemQuantity,
}: ProductListProps) {
  return (
    <Styled.UlContainer>
      {productList.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isInCart={selectedProductIdList.includes(product.id.toString())}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          handleIncreaseCartItemQuantity={handleIncreaseCartItemQuantity}
        />
      ))}
    </Styled.UlContainer>
  );
}

export default ProductList;
