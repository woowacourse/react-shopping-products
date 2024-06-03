import useProducts from "../../hooks/useProducts";
import ProductListHeader from "../ProductListHeader/ProductListHeader";
import ProductItem from "./ProductItem/ProductItem";
import * as PL from "./ProductList.style";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import usePagination from "../../hooks/usePagination";

const ProductList = () => {
  const { page, nextPage, resetPage } = usePagination();

  const { products, loading, hasMore, handleCategory, handleSort } =
    useProducts({
      page,
      resetPage,
    });

  const { lastElementRef: lastProductElementRef } = useInfiniteScroll({
    hasMore,
    loading,
    nextPage,
  });

  return (
    <>
      <ProductListHeader
        handleCategory={handleCategory}
        handleSort={handleSort}
      />
      {!loading && products.length === 0 ? (
        <PL.Empty>상품이 존재하지 않습니다! 🥲</PL.Empty>
      ) : (
        <PL.ProductListStyle>
          {products.map((item, index) => {
            return (
              <ProductItem
                product={item}
                key={item.id}
                ref={
                  index === products.length - 1 ? lastProductElementRef : null
                }
              />
            );
          })}
        </PL.ProductListStyle>
      )}
      {loading && <PL.Loading>로딩중! 💪</PL.Loading>}
    </>
  );
};

export default ProductList;
