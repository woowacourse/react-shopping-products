import { useEffect } from "react";
import { useProducts } from "../../entities/product/useProducts";
import { TOAST_TYPES } from "../../shared/config/toast";
import useToast from "../../shared/hooks/useToast";
import * as S from "./ProductCatalog.styles";
import CategoryFilter from "./ProductControlPanel/CategoryFilter/CategoryFilter";
import ProductSorter from "./ProductControlPanel/ProductSorter/ProductSorter";
import ProductItem from "./ProductItem/ProductItem";
import ProductItemSkeleton from "./ProductItemSkeleton/ProductItemSkeleton";

const ProductsSkeleton = Array.from({ length: 6 }).map((_, index) => (
  <ProductItemSkeleton key={index} />
));

const ProductCatalog = () => {
  const { isLoading, products, error } = useProducts();
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast({
        message: error,
        type: TOAST_TYPES.ERROR,
      });
    }
  }, [error, showToast]);

  return (
    <S.ProductCatalog>
      <S.ProductCatalogTitle>상품목록</S.ProductCatalogTitle>
      <S.ProductControlPanel>
        <CategoryFilter />
        <ProductSorter />
      </S.ProductControlPanel>
      <S.ProductGrid>
        {!isLoading
          ? products?.content.map((productInfo) => (
              <ProductItem key={productInfo.id} {...productInfo} />
            ))
          : ProductsSkeleton}
      </S.ProductGrid>
    </S.ProductCatalog>
  );
};

export default ProductCatalog;
