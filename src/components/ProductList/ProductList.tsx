import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductList.styled";
function ProductList() {
  return (
    <S.ProductListContainer>
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </S.ProductListContainer>
  );
}

export default ProductList;
