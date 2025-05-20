import Product from "../Product/Product";

import { Product as ProductType } from "../../types/Product";

import * as Styled from "./ProductList.styled";

interface ProductListProps {
  selectedProductIdList: string[];
  productList: readonly ProductType[];
  handleRemoveProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddProduct: (productId: string) => void;
}

function ProductList({
  selectedProductIdList,
  productList,
  handleAddProduct,
  handleRemoveProduct,
}: ProductListProps) {
  return (
    <Styled.UlContainer>
      {productList.map((product) => (
        <Product
          key={product.id}
          product={product}
          isInCart={selectedProductIdList.includes(product.id.toString())}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />
      ))}
    </Styled.UlContainer>
  );
}

export default ProductList;
