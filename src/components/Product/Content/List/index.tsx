import ProductItem from "./Item";
import * as S from "./ProductList.styled";
import { ProductItemType } from "@/types/product";

interface ProductListProps {
  productItemList: ProductItemType[];
}

function ProductList({ productItemList }: ProductListProps) {
  if (!productItemList) return null;

  return (
    <>
      {productItemList.length > 0 ? (
        <S.ProductList>
          {productItemList.map((productItem) => (
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
