import { useContext, useEffect, useRef } from "react";
import { QuantityContext } from "../../store/QuantityContext";
import useProductList from "../../hooks/useProductList";
import useCartItemList from "../../hooks/useAddCartItem";
import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductItemList.style";
import { Category, Product } from "../../interfaces/Product";
import { Sorting } from "../../interfaces/Sorting";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import Spinner from "../common/Spinner/Spinner";
import useFetchCartItemList from "../../hooks/useFetchCartItemList";

interface ProductItemListProp {
  category: Category;
  sort: Sorting;
}

function ProductItemList({ category, sort }: ProductItemListProp) {
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
  }).productListQuery;

  const {
    data: cartItemListData,
    error: cartItemListError,
    isFetching: isCartItemListFetching,
  } = useFetchCartItemList().cartItemListQuery;

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
          page.content.map((product: Product, idx: number) => (
            <ProductItem
              key={`${idx}_${product.id}`}
              product={product}
              cartItemList={cartItemListData?.content ?? []}
            />
          ))
        )}
      </S.ProductList>
      <div ref={target} style={{ height: "1px" }}></div>
      {isProductListFetching && <Spinner />}
    </>
  );
}

export default ProductItemList;
