import { Product } from "../types/productType";
import ProductItem from "./ProductItem/ProductItem";
import ProductItemSkeleton from "./ProductItem/ProductItemSkeleton";
import { PRODUCT_TYPE_COUNT } from "../hooks/useProducts";
import { useAPIData } from "../hooks/useApi";

type ProductItemWithSkeletonProps = {
  isLoading: boolean;
};

const ProductItemsWithSkeleton = ({
  isLoading,
}: ProductItemWithSkeletonProps) => {
  const productData = useAPIData<{ data: { content: Product[] } }>("products");
  const products = productData?.data.content;

  return isLoading ? (
    <ProductItemSkeletons />
  ) : (
    products &&
      products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))
  );
};

export default ProductItemsWithSkeleton;

const ProductItemSkeletons = () => {
  return (
    <>
      {Array.from({ length: PRODUCT_TYPE_COUNT }, (_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </>
  );
};
