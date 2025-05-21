import Product from "../Product/Product";
import Spinner from "../common/Spinner/Spinner";

import { useCartItemsIdContext } from "../../context/CartItemsContext";

import useProductList from "../../hooks/useProductList";

import { Sort } from "../../types/Sort";
import { ProductCategory } from "../../types/ProductCategory";

import * as Styled from "./ProductList.styled";

interface ProductListProps {
  category: ProductCategory;
  sort: Sort;
}

function ProductList({ category, sort }: ProductListProps) {
  const { cartItemsId } = useCartItemsIdContext();
  const { state, productList } = useProductList({
    category,
    sort,
  });

  if (state.isLoading) {
    return <Spinner />;
  }

  return (
    <Styled.UlContainer>
      {productList.map((product) => (
        <Product
          key={product.id}
          product={product}
          isInCart={cartItemsId
            .map((item) => item.productId)
            .includes(product.id.toString())}
        />
      ))}
    </Styled.UlContainer>
  );
}

export default ProductList;
