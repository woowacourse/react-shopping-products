import Product from "../Product/Product";

import { Product as ProductType } from "../../types/Product";

import styled from "@emotion/styled";

interface ProductListProps {
  productList: readonly ProductType[];
}

function ProductList({ productList }: ProductListProps) {
  return (
    <UlContainer>
      {productList.map((product) => (
        <Product product={product}></Product>
      ))}
    </UlContainer>
  );
}

const UlContainer = styled.ul`
  max-width: 380px;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export default ProductList;
