import { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import ProductCardList from "../productCardList/ProductCardList";
import Sort from "../sort/Sort";
import { Container, SelectContainer, Title } from "./ProductContainer.css";
import { CategoryType, SortType } from "../../types/index.types";
import { useData } from "../../provider/DataProvider";
import fetchProducts from "../../api/products";
import { useToast } from "../../provider/ToastProvider";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";

const DATA_NAME = "products";

function ProductContainer() {
  const { showToast } = useToast();
  const { fetchData, loading, error } = useData();

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("전체");
  const [selectedSort, setSelectedSort] = useState<SortType>("낮은 가격순");

  useEffect(() => {
    fetchData(DATA_NAME, () =>
      fetchProducts({ category: selectedCategory, sort: selectedSort })
    );
  }, [selectedCategory, selectedSort, fetchData]);

  if (loading(DATA_NAME)) return <ProductCardListSkeleton />;

  if (error(DATA_NAME)) showToast("데이터 로딩중 에러가 발생했습니다.");

  return (
    <div css={Container}>
      <h2 css={Title}>bpple 상품 목록</h2>
      <div css={SelectContainer}>
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      </div>
      <ProductCardList />
    </div>
  );
}

export default ProductContainer;
