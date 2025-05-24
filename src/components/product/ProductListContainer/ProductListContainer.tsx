import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";
import Spinner from "../../common/Spinner/Spinner";

import * as Styled from "./ProductListContainer.styled";
import useProductList from "../../../hooks/useProductList";

interface ProductListContainerProps {
  selectedProductIdList: string[];
  handleAddProduct: (productId: string) => void;
  handleRemoveProduct: (productId: string) => void;
  handleIncreaseCartItemQuantity: (productId: string) => void;
}

function ProductListContainer({
  selectedProductIdList,
  handleAddProduct,
  handleRemoveProduct,
  handleIncreaseCartItemQuantity,
}: ProductListContainerProps) {
  const { productList, handleCategory, handleSort } = useProductList();

  return (
    <Styled.Container>
      <Styled.ProductListTitle>bpple 상품 목록</Styled.ProductListTitle>
      <Filter handleCategory={handleCategory} handleSort={handleSort} />
      {productList === null ? (
        <Spinner />
      ) : (
        <ProductList
          selectedProductIdList={selectedProductIdList}
          productList={productList}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          handleIncreaseCartItemQuantity={handleIncreaseCartItemQuantity}
        />
      )}
    </Styled.Container>
  );
}

export default ProductListContainer;
