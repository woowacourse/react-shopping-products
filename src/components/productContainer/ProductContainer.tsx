import { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import ProductCardList from "../productCardList/ProductCardList";
import Sort from "../sort/Sort";
import { Container, SelectContainer, Title } from "./ProductContainer.css";
import { CategoryType, SortType } from "../../types/index.types";
import { useData } from "../../provider/DataProvider";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";
import useFetchData from "../../hooks/useFetchData/useFetchData";

const DATA_NAME = "products";

function ProductContainer() {
  const { fetchData, loading } = useData();
  const { getProducts } = useFetchData();

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("전체");
  const [selectedSort, setSelectedSort] = useState<SortType>("낮은 가격순");

  useEffect(() => {
    fetchData(DATA_NAME, () =>
      getProducts({ category: selectedCategory, sort: selectedSort })
    );
  }, [selectedCategory, selectedSort, fetchData, getProducts]);

  if (loading(DATA_NAME)) return <ProductCardListSkeleton />;

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
