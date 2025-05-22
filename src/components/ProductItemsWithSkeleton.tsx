import { CartItem, Product } from "../types/productType";
import ProductItem from "./ProductItem/ProductItem";
import ProductItemSkeleton from "./ProductItem/ProductItemSkeleton";
import { PRODUCT_TYPE_COUNT } from "../hooks/useProducts";

type ProductItemWithSkeletonProps = {
  isLoading: boolean;
  products: Product[];
  addToCart: (product: Product) => void;
  cart: CartItem[];
};

const isInCart = (cartItem: CartItem[], id: number) => {
  return cartItem.some((item) => item.product.id === id);
};

const ProductItemsWithSkeleton = ({
  isLoading,
  products,
  addToCart,
  cart,
}: ProductItemWithSkeletonProps) => {
  return isLoading ? (
    <ProductItemSkeletons />
  ) : (
    products.map((product) => (
      <ProductItem
        key={product.id}
        product={product}
        addToCart={addToCart}
        isInCart={isInCart(cart, product.id)}
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
