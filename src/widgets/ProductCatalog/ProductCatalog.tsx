import CartInitializer from "../../features/cart/contexts/CartInitializer";
import ProductInitializer from "../../features/product/contexts/ProductInitializer";
import { useProduct } from "../../features/product/hooks/useProduct";
import * as S from "./ProductCatalog.styles";
import CategoryFilter from "./ProductControlPanel/CategoryFilter/CategoryFilter";
import ProductSorter from "./ProductControlPanel/ProductSorter/ProductSorter";
import ProductItem from "./ProductItem/ProductItem";
import ProductItemSkeleton from "./ProductItemSkeleton/ProductItemSkeleton";

// TODO: 로딩 상태 관리하기
const ProductsSkeleton = Array.from({ length: 6 }).map((_, index) => (
  <ProductItemSkeleton key={index} />
));

const ProductCatalog = () => {
  const { products } = useProduct();

  return (
    <S.ProductCatalog>
      <ProductInitializer />
      <CartInitializer />
      <S.ProductCatalogTitle>상품목록</S.ProductCatalogTitle>
      <S.ProductControlPanel>
        <CategoryFilter />
        <ProductSorter />
      </S.ProductControlPanel>
      <S.ProductGrid>
        {/* {!loading
          ? products?.map((productInfo) => (
              <ProductItem key={productInfo.id} {...productInfo} />
            ))
          : ProductsSkeleton} */}
        {products?.map((productInfo) => (
          <ProductItem key={productInfo.id} {...productInfo} />
        ))}
      </S.ProductGrid>
    </S.ProductCatalog>
  );
};

export default ProductCatalog;
