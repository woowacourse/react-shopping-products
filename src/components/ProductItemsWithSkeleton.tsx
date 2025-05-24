import { CartItem, Product } from "../types/productType";
import ProductItem from "./ProductItem/ProductItem";
import ProductItemSkeleton from "./ProductItem/ProductItemSkeleton";
import { PRODUCT_TYPE_COUNT } from "../hooks/useProducts";
import { useAPIData } from "../contexts/DataContext";

type ProductItemWithSkeletonProps = {
  isLoading: boolean;
  addToCart: (product: Product) => void;
  patchQuantity: (id: number, quantity: number) => void;
};

const ProductItemsWithSkeleton = ({
  isLoading,
  addToCart,
  patchQuantity,
}: ProductItemWithSkeletonProps) => {
  const productData = useAPIData<{ data: { content: Product[] } }>("products");
  const cartData = useAPIData<{ data: { content: CartItem[] } }>("cartItems");

  const products = productData?.data.content;
  const cart = cartData?.data.content;

  if (!products || !cart) return null;

  return isLoading ? (
    <ProductItemSkeletons />
  ) : (
    products.map((product) => (
      <ProductItem
        key={product.id}
        product={product}
        addToCart={addToCart}
        patchQuantity={patchQuantity}
      />
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
