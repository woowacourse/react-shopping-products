import useApiResponseToasts from "../../apis/contexts/useApiResponseToasts";
import { useProducts } from "../../features/product/hooks/useProducts";
import * as S from "./ProductCatalog.styles";
import CategoryFilter from "./ProductControlPanel/CategoryFilter/CategoryFilter";
import ProductSorter from "./ProductControlPanel/ProductSorter/ProductSorter";
import ProductItem from "./ProductItem/ProductItem";
import ProductItemSkeleton from "./ProductItemSkeleton/ProductItemSkeleton";

const ProductsSkeleton = Array.from({ length: 6 }).map((_, index) => (
  <ProductItemSkeleton key={index} />
));

const ProductCatalog = () => {
  const { loading, products, error } = useProducts();
  useApiResponseToasts(error);

  return (
    <S.ProductCatalog>
      <S.ProductCatalogTitle>상품목록</S.ProductCatalogTitle>
      <S.ProductControlPanel>
        <CategoryFilter />
        <ProductSorter />
      </S.ProductControlPanel>
      <S.ProductGrid>
        {!loading
          ? products?.content.map((productInfo) => (
              <ProductItem key={productInfo.id} {...productInfo} />
            ))
          : ProductsSkeleton}
      </S.ProductGrid>
    </S.ProductCatalog>
  );
};

export default ProductCatalog;
