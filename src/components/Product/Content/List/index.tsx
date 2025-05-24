import ProductItem from "./Item";
import * as S from "./ProductList.styled";
import { ProductItemType } from "@/types/product";

interface ProductListProps {
  data: ProductItemType[];
}

function ProductList({ data }: ProductListProps) {
  if (!data) return null; // 또는 로딩 스피너

  return (
    <>
      {data.length > 0 ? (
        <S.ProductList>
          {data.map((productItem) => (
            <ProductItem
              key={productItem.id}
              product={productItem}
              variant="default"
            />
          ))}
        </S.ProductList>
      ) : (
        <S.EmptyProductList>등록된 상품이 없습니다.</S.EmptyProductList>
      )}
    </>
  );
}

export default ProductList;
