import { CartItem, Product } from '../App';
import isInCart from '../utils/isIncart';
import ProductItem from './ProductItem/ProductItem';
import ProductItemSkeleton from './ProductItem/ProductItemSkeleton';

type ProductItemWithSkeletonProps = {
  isLoading: boolean;
  products: Product[];
  cartItems: CartItem[];
  isCartItemsLoading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
};

const ProductItemsWithSkeleton = ({
  products,
  isLoading,
  cartItems,
  isCartItemsLoading,
  addToCart,
  removeFromCart,
}: ProductItemWithSkeletonProps) => {
  return isLoading ? (
    <ProductItemSkeletons />
  ) : (
    products.map((product) => (
      <ProductItem
        key={product.id}
        product={product}
        isInCart={isInCart(cartItems, product.id)}
        isCartItemsLoading={isCartItemsLoading}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    ))
  );
};

export default ProductItemsWithSkeleton;

const ProductItemSkeletons = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </>
  );
};
