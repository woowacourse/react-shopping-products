import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AppLayout, ProductListLayout } from "@/layout";
import { Filter, Header, ProductList, ProductListTitle } from "@/components";
import { getProducts } from "@/api/product";
import { getCartItems } from "@/api/cartItem";
import { useIntersectionObserver, useFilters } from "@/hooks";
import { changeToProductList } from "@/utils/product";

const App = () => {
  const { category, sort, handleCategoryChange, handleSortChange } =
    useFilters();

  const {
    data: productsData,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["products", category, sort],
    queryFn: ({ pageParam }) =>
      getProducts(pageParam.page, pageParam.size, category, sort),
    initialPageParam: { page: 0, size: 20 },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last) return;
      if (allPages.length === 0) {
        return { page: 0, size: 20 };
      }
      return { page: allPages.length + 4, size: 4 };
    },
  });
  const { data: cartItemsData } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  const observerTarget = useIntersectionObserver(fetchNextPage);

  return (
    <AppLayout>
      <Header cartItemKind={cartItemsData?.length || 0} />
      <ProductListLayout>
        <ProductListTitle />
        <Filter
          category={category}
          sort={sort}
          handleCategoryChange={handleCategoryChange}
          handleSortChange={handleSortChange}
          style={{ marginTop: "24px", marginBottom: "28px" }}
        />
        <ProductList productList={changeToProductList(productsData)} />
        {isFetching && <div>로딩중............</div>}
        {<div ref={observerTarget}></div>}
      </ProductListLayout>
    </AppLayout>
  );
};

export default App;
