import { useState } from "react";
import Filter from "../filter/Filter";
import ProductCardList from "../productCardList/ProductCardList";
import Sort from "../sort/Sort";
import { Container, SelectContainer, Title } from "./ProductContainer.css";
import { ProductPageResponse } from "../../types/response.types";

function ProductContainer() {
  const [products, setProducts] = useState<ProductPageResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    "전체" | "패션잡화" | "식료품"
  >("전체");
  const [selectedSort, setSelectedSort] = useState<
    "낮은 가격순" | "높은 가격순"
  >("낮은 가격순");

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
      <ProductCardList
        products={products}
        setProducts={setProducts}
        category={selectedCategory}
        sort={selectedSort}
      />
    </div>
  );
}

export default ProductContainer;
