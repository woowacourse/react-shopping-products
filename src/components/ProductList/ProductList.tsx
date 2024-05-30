import useProducts from "../../hooks/useProducts";
import ProductListHeader from "../ProductListHeader/ProductListHeader";
import ProductItem from "./ProductItem/ProductItem";
import { ProductListStyle } from "./ProductList.style";
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
      <ProductListStyle>
        {products.map((item, index) => {
          return (
            <ProductItem
              product={item}
              key={item.id}
              ref={index === products.length - 1 ? lastProductElementRef : null}
            />
          );
        })}
      </ProductListStyle>
    </>
  );
};

export default ProductList;
