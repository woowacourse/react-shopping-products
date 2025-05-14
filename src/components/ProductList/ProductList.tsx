import Product from "../Product/Product";

import { Product as ProductType } from "../../types/Product";

import * as Styled from "./ProductList.styled";

interface ProductListProps {
  productList: readonly ProductType[];
}

function ProductList({ productList }: ProductListProps) {
  return (
    <Styled.UlContainer>
      {productList.map((product) => (
        <Product key={product.id} product={product}></Product>
      ))}
    </Styled.UlContainer>
  );
}

export default ProductList;
