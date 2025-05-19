import { useState } from "react";
import Filter from "../filter/Filter";
import ProductCardList from "../productCardList/ProductCardList";
import Sort from "../sort/Sort";
import { Container, SelectContainer, Title } from "./ProductContainer.css";
import { categoryType, sortType } from "../../types/index.types";
import { ERROR_TYPE } from "../../hooks/useError";
import useFetchProducts from "../../hooks/useFetchProducts";
import { ProductPageResponse } from "../../types/response.types";
interface ProductContainerProps {
  setErrorTrue: (type: ERROR_TYPE) => void;
}
function ProductContainer({ setErrorTrue }: ProductContainerProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<categoryType>("전체");
  const [selectedSort, setSelectedSort] = useState<sortType>("낮은 가격순");
  const [products, setProducts] = useState<ProductPageResponse | null>(null);
  const { isLoading } = useFetchProducts({
    category: selectedCategory,
    setProducts,
    sort: selectedSort,
    setErrorTrue,
  });

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
        isLoading={isLoading}
        setErrorTrue={setErrorTrue}
      />
    </div>
  );
}

export default ProductContainer;
