import Product from "../Product/Product";

import { Product as ProductType } from "../../types/Product";

import * as Styled from "./ProductList.styled";

interface ProductListProps {
  cartItems: string[];
  productList: readonly ProductType[];
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ProductList({
  cartItems,
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
          isInCart={cartItems.includes(product.id.toString())}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />
      ))}
    </Styled.UlContainer>
  );
}

export default ProductList;
