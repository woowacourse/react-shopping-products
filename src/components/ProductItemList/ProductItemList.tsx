import { useEffect, useRef } from "react";
import useProductList from "../../hooks/useProductList";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductItemList.style";
import { Category, Product } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import Spinner from "../common/Spinner/Spinner";
import useCartItem from "../../hooks/useCartItem";

interface ProductItemListProp {
  category: Category;
  sort: Sorting;
}

function ProductItemList({ category, sort }: ProductItemListProp) {
  const { fetchCartItemList } = useCartItem();
  const {
    data: productListData,
    error: productListError,
    fetchNextPage,
    hasNextPage,
    isFetching: isProductListFetching,
    isFetchingNextPage,
  } = useProductList({
    category,
    sort,
  });

  const { data: cartItemListData, error: cartItemListError } =
    fetchCartItemList;

  const target = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);

  useEffect(() => {
    if (target.current === null) return;
    observe(target.current);

    if (productListData?.pages.length === 0 || !hasNextPage) {
      unobserve(target.current);
    }
  }, [productListData?.pages, observe, unobserve, hasNextPage]);
  if (productListError) {
    throw productListError;
  }
  return (
    <>
      <S.ProductList>
        {productListData?.pages.map((page) =>
          page.content.map((product: Product) => (
            <ProductItem
              key={product.id}
              product={product}
              cartItemList={cartItemListData?.content ?? []}
            />
          ))
        )}
      </S.ProductList>
      <div ref={target} style={{ height: "1px" }}></div>
      {(isProductListFetching || isFetchingNextPage) && <Spinner />}
    </>
  );
}

export default ProductItemList;
