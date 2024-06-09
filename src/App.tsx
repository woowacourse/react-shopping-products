import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppLayout, ProductListLayout } from "@/layout";
import { Filter, Header, ProductList, ProductListTitle, Cart } from "@/components";
import { getCartItems } from "@/api";
import { useIntersectionObserver, useFilters, useInfiniteProduct } from "@/hooks";
import { changeToProductList } from "@/utils/product";

const App = () => {
  const { category, sort, handleCategoryChange, handleSortChange } = useFilters();

  const { data: productsData, fetchNextPage, isFetching } = useInfiniteProduct(category, sort);

  const { data: cartItemsData } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  const observerTarget = useIntersectionObserver(fetchNextPage, isFetching);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenCart = () => {
    dialogRef.current?.showModal();
    document.body.style.overflow = `hidden`;
  };

  return (
    <AppLayout>
      <Header cartItemKind={cartItemsData?.length || 0} handleOpenCart={handleOpenCart} />
      <ProductListLayout>
        <ProductListTitle />
        <Filter
          category={category}
          sort={sort}
          handleCategoryChange={handleCategoryChange}
          handleSortChange={handleSortChange}
          style={{ marginTop: "24px", marginBottom: "28px" }}
        />
        <ProductList productList={changeToProductList(productsData, cartItemsData)} />
        {isFetching && <div>로딩중............</div>}
        {!isFetching && <div ref={observerTarget}></div>}
      </ProductListLayout>
      <Cart dialogRef={dialogRef} cartItems={cartItemsData} />
    </AppLayout>
  );
};

export default App;
