import ProductItem from "./ProductItem/ProductItem";
import * as PL from "./ProductList.style";
import { Fragment } from "react/jsx-runtime";
import useProducts from "../../hooks/useProducts";
import ProductListHeader from "./ProductListHeader/ProductListHeader";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { InfiniteData } from "@tanstack/react-query";
import { ProductsResponse } from "../../hooks/useProductsInfiniteQuery";

const ProductList = () => {
  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    handleCategory,
    handleSort,
  } = useProducts();

  const { lastElementRef: lastProductElementRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetching,
    nextPage: fetchNextPage,
  });

  const isLastElement = (
    pageIndex: number,
    productIndex: number,
    data: InfiniteData<ProductsResponse>
  ) => {
    return (
      pageIndex === data.pages.length - 1 &&
      productIndex === data.pages[pageIndex].content.length - 1
    );
  };

  return (
    <>
      <ProductListHeader
        handleCategory={handleCategory}
        handleSort={handleSort}
      />
      {!data ? (
        <PL.Empty>상품이 존재하지 않습니다! 🥲</PL.Empty>
      ) : (
        <PL.ProductListStyle>
          {data.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.content.map((product: Product, productIndex: number) => (
                <ProductItem
                  product={product}
                  key={product.id}
                  ref={
                    isLastElement(pageIndex, productIndex, data)
                      ? lastProductElementRef
                      : null
                  }
                />
              ))}
            </Fragment>
          ))}
        </PL.ProductListStyle>
      )}
      {isFetching && <PL.Loading>로딩중! 💪</PL.Loading>}
    </>
  );
};

export default ProductList;
