import Product from "../Product/Product";

import { Product as ProductType } from "../../types/Product";

import * as Styled from "./ProductList.styled";

interface ProductListProps {
  productList: readonly ProductType[];
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ProductList({ productList, handleAddProduct }: ProductListProps) {
  return (
    <Styled.UlContainer>
      {productList.map((product) => (
        <Product
          key={product.id}
          product={product}
          handleAddProduct={handleAddProduct}
        />
      ))}
    </Styled.UlContainer>
  );
}

export default ProductList;
