import Product from "../Product/Product";
import Spinner from "../common/Spinner/Spinner";

import useProductList from "../../hooks/useProductList";

import { Sort } from "../../types/Sort";
import { ProductCategory } from "../../types/ProductCategory";

import * as Styled from "./ProductList.styled";
import useCartItemsId from "../../hooks/useCartItemsId";

interface ProductListProps {
  category: ProductCategory;
  sort: Sort;
}

function ProductList({ category, sort }: ProductListProps) {
  const { cartItemsId } = useCartItemsId();
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
