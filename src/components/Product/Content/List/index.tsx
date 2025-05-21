import ProductItem from "./Item";
import * as S from "./ProductList.styled";
import { useProductContext } from "@/context/ProductContext";

function ProductList() {
  const { productData } = useProductContext();
  return (
    <>
      {productData.length > 0 ? (
        <S.ProductList>
          {productData.map((productItem) => (
            <ProductItem key={productItem.id} product={productItem} />
          ))}
        </S.ProductList>
      ) : (
        <S.EmptyProductList>등록된 상품이 없습니다.</S.EmptyProductList>
      )}
    </>
  );
}

export default ProductList;
