import { useEffect, useRef } from "react";
import useProductList from "../../hooks/useProductList";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductItemList.style";
import { Category, Product } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import Spinner from "../common/Spinner/Spinner";
import useFetchCartItem from "../../hooks/useFetchCartItem";

interface ProductItemListProp {
  category: Category;
  sort: Sorting;
}

function ProductItemList({ category, sort }: ProductItemListProp) {
  const { fetchCartItemList } = useFetchCartItem();
  const {
    data: productListData,
    fetchNextPage,
    hasNextPage,
    isFetching: isProductListFetching,
    isFetchingNextPage,
  } = useProductList({
    category,
    sort,
  });

  const { data: cartItemListData } = fetchCartItemList;

  const target = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);

  useEffect(() => {
    if (target.current === null) return;
    observe(target.current);

    if (productListData?.pages.length === 0 || !hasNextPage) {
      unobserve(target.current);
    }
  }, [productListData?.pages, observe, unobserve, hasNextPage]);

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
