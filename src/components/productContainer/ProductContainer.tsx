import Filter from "../filter/Filter";
import ProductCardList from "../productCardList/ProductCardList";
import Sort from "../sort/Sort";
import { Container, SelectContainer, Title } from "./ProductContainer.css";

function ProductContainer() {
  return (
    <div css={Container}>
      <h2 css={Title}>bpple 상품 목록</h2>
      <div css={SelectContainer}>
        <Filter />
        <Sort />
      </div>
      <ProductCardList />
    </div>
  );
}

export default ProductContainer;
