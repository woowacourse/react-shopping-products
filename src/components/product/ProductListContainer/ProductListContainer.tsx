import ProductList from "../ProductList/ProductList";
import Filter from "../Filter/Filter";
import Spinner from "../../common/Spinner/Spinner";

import * as Styled from "./ProductListContainer.styled";
import useProductList from "../../../hooks/useProductList";
import { CartItem } from "../../../types/FetchCartItemsResult";

interface ProductListContainerProps {
  cartItems: CartItem[];
  handleAddProduct: (productId: number) => void;
  handleIncreaseCartItemQuantity: (productId: number) => void;
  handleDecreaseCartItemQuantity: (productId: number) => void;
}

function ProductListContainer({
  cartItems,
  handleAddProduct,
  handleIncreaseCartItemQuantity,
  handleDecreaseCartItemQuantity,
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
          cartItems={cartItems}
          productList={productList}
          handleAddProduct={handleAddProduct}
          handleIncreaseCartItemQuantity={handleIncreaseCartItemQuantity}
          handleDecreaseCartItemQuantity={handleDecreaseCartItemQuantity}
        />
      )}
    </Styled.Container>
  );
}

export default ProductListContainer;
