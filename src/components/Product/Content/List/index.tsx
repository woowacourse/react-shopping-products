import { ProductItemType } from "@/apis/products/product.type";
import ProductItem from "./Item";
import * as S from "./ProductList.styled";
import { use } from "react";

interface ProductListProps {
  resource: Promise<ProductItemType[]>;
}

function ProductList({ resource }: ProductListProps) {
  const products = use(resource);

  return (
    <>
      {products.length > 0 ? (
        <S.ProductList>
          {products.map((productItem) => (
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
