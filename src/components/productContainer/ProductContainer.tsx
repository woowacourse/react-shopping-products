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

  const filteredCategory = products && {
    ...products,
    content:
      selectedCategory === "전체"
        ? products?.content
        : products?.content.filter(
            (product) => product.category === selectedCategory
          ),
  };

  return (
    <div css={Container}>
      <h2 css={Title}>bpple 상품 목록</h2>
      <div css={SelectContainer}>
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Sort />
      </div>
      <ProductCardList products={filteredCategory} setProducts={setProducts} />
    </div>
  );
}

export default ProductContainer;
