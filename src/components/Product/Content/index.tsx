import ProductList from "./List";
import * as S from ".//ProductContent.styled";
import FilterSortControl from "./FilterSortControl";
import { Suspense, useMemo, useState } from "react";
import { FilterOption, SortOption } from "./ProductContent.type";
import { getProducts } from "@/apis/products/getProducts";
import { wrapPromise } from "@/apis/wrapPromise";

const 장바구니 = [
  {
    id: 5,
    quantity: 1,
    product: {
      id: 62,
      name: "짱구 파자마 세트",
      price: 19940505,
      imageUrl: "https://cdn.finomy.com/news/photo/201806/55827_40819_4617.png",
      category: "패션잡화",
    },
  },
];

function ProductContent() {
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
        <ProductList resource={productResource} cartItems={장바구니} />
      </Suspense>
    </S.Container>
  );
}

export default ProductContent;
