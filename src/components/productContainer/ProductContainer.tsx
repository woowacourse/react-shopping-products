import { useState } from "react";
import Filter from "../filter/Filter";
import ProductCardList from "../productCardList/ProductCardList";
import Sort from "../sort/Sort";
import { Container, SelectContainer, Title } from "./ProductContainer.css";
import { CategoryType, SortType } from "../../types/index.types";

function ProductContainer() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("전체");
  const [selectedSort, setSelectedSort] = useState<SortType>("낮은 가격순");

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
      <ProductCardList category={selectedCategory} sort={selectedSort} />
    </div>
  );
}

export default ProductContainer;
