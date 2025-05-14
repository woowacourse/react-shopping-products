import ProductItem from "../ProductItem/ProductItem";
import * as S from "./ProductList.styled";
import { ResponseCartItem, ResponseProduct } from "../../api/types";
function ProductList({
  productList,
  cartItemList,
}: {
  productList: ResponseProduct[];
  cartItemList: ResponseCartItem[];
}) {
  return (
    <S.ProductListContainer>
      {productList.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          cartItemList={cartItemList}
        />
      ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
