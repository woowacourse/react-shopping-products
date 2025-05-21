import ProductList from "./List";
import * as S from ".//ProductContent.styled";
import FilterSortControl from "./FilterSortControl";
import { useEffect, useState } from "react";
import { FilterOption, SortOption } from "./ProductContent.type";
import { getProducts } from "@/apis/products/getProducts";
import { CartItemType, SetCartItems } from "@/types/cartItem";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/Fallback/ErrorFallback";
import LoadingFallback from "@/components/Fallback/LoadingFallback";
import { ProductItemType } from "@/types/product";

interface ProductContentProps {
  cartItems: CartItemType[];
  setCartItems: SetCartItems;
}

function ProductContent({ cartItems, setCartItems }: ProductContentProps) {
  const [filterOption, setFilterOption] = useState<FilterOption>("전체");
  const [sortOption, setSortOption] = useState<SortOption>("낮은 가격순");
  const [productData, setProductData] = useState<ProductItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const productData = await getProducts({ filterOption, sortOption });
      setProductData(productData);
      setIsLoading(false);
    }

    fetchProducts();
  }, [filterOption, sortOption]);

  const handleFilterSelect = (option: FilterOption) => {
    setFilterOption(option);
  };

  const handleSortSelect = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <S.Container>
      <S.Title>bpple 상품 목록</S.Title>
      <FilterSortControl
        filterOption={filterOption}
        sortOption={sortOption}
        onFilterChange={handleFilterSelect}
        onSortChange={handleSortSelect}
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
