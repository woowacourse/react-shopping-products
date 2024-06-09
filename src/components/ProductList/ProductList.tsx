import ProductItem from "./ProductItem/ProductItem";
import * as PL from "./ProductList.style";
import { Fragment } from "react/jsx-runtime";
import useProducts from "../../hooks/useProducts";
import ProductListHeader from "./ProductListHeader/ProductListHeader";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

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
          {data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.content.map((product: Product, index: number) => (
                <ProductItem
                  product={product}
                  key={product.id}
                  ref={
                    i === data.pages.length - 1 &&
                    index === page.content.length - 1
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
