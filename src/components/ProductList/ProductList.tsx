import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductList.styled";
import { ResponseCartItem, ResponseProduct } from "../../api/types";

function ProductList({
  productList,
  cartItemList,
  setErrorMessage,
}: {
  productList: ResponseProduct[];
  cartItemList: ResponseCartItem[];
  setErrorMessage: (message: string) => void;
}) {
  return (
    <S.ProductListContainer>
      {productList.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          cartItemList={cartItemList}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
