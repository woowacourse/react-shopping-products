import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";
import Spinner from "../../common/Spinner/Spinner";

import * as Styled from "./ProductListContainer.styled";
import useProductList from "../../../hooks/useProductList";

function ProductListContainer() {
  const { productList, loading, handleCategory, handleSort } = useProductList();

  return (
    <Styled.Container>
      <Styled.ProductListTitle>bpple 상품 목록</Styled.ProductListTitle>
      <Filter handleCategory={handleCategory} handleSort={handleSort} />
      {loading ? <Spinner /> : <ProductList productList={productList} />}
    </Styled.Container>
  );
}

export default ProductListContainer;
