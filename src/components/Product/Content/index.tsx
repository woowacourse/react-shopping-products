import ProductList from "./List";
import * as S from ".//ProductContent.styled";
import FilterSortControl from "./FilterSortControl";
import { Suspense, useMemo, useState } from "react";
import { FilterOption, SortOption } from "./ProductContent.type";
import { getProducts } from "@/apis/products/getProducts";
import { wrapPromise } from "@/apis/wrapPromise";
import { CartItemType, OnAddToCart, OnRemoveToCart } from "@/types/cartItem";

interface ProductContentProps {
  cartItems: CartItemType[];
  onAddToCart: OnAddToCart;
  onRemoveToCart: OnRemoveToCart;
}

function ProductContent({
  cartItems,
  onAddToCart,
  onRemoveToCart,
}: ProductContentProps) {
  const [filterOption, setFilterOption] = useState<FilterOption>("전체");
  const [sortOption, setSortOption] = useState<SortOption>("낮은 가격순");
  const productResource = useMemo(
    () => wrapPromise(getProducts({ filterOption, sortOption })),
    [filterOption, sortOption]
  );

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
      <Suspense fallback={<div>로딩 중...</div>}>
        <ProductList
          resource={productResource}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onRemoveToCart={onRemoveToCart}
        />
      </Suspense>
    </S.Container>
  );
}

export default ProductContent;
