import ProductList from "./List";
import * as S from ".//ProductContent.styled";
import FilterSortControl from "./FilterSortControl";
import { CartItemType, SetCartItems } from "@/types/cartItem";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/Fallback/ErrorFallback";
import LoadingFallback from "@/components/Fallback/LoadingFallback";

import { useProductContext } from "@/context/ProductContext";

interface ProductContentProps {
  cartItems: CartItemType[];
  setCartItems: SetCartItems;
}

function ProductContent({ cartItems, setCartItems }: ProductContentProps) {
  const {
    productData,
    isLoading,
    filterOption,
    sortOption,
    setFilterOption,
    setSortOption,
  } = useProductContext();

  return (
    <S.Container>
      <S.Title>bpple 상품 목록</S.Title>
      <FilterSortControl
        filterOption={filterOption}
        sortOption={sortOption}
        onFilterChange={setFilterOption}
        onSortChange={setSortOption}
      />
      {isLoading ? (
        <LoadingFallback message="상품 목록을 가져오는 중 입니다..." />
      ) : (
        <ErrorBoundary
          fallback={
            <ErrorFallback message="상품 목록을 가져오는 중 에러가 발생하였습니다." />
          }
        >
          <ProductList
            productData={productData}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </ErrorBoundary>
      )}
    </S.Container>
  );
}

export default ProductContent;
