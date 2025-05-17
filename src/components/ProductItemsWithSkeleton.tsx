import { CartItem, Product } from '../App';
import isInCart from '../utils/isIncart';
import ProductItem from './ProductItem/ProductItem';
import ProductItemSkeleton from './ProductItem/ProductItemSkeleton';

type ProductItemWithSkeletonProps = {
  isLoading: boolean;
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  cartItems: CartItem[];
};

const ProductItemsWithSkeleton = ({
  isLoading,
  products,
  addToCart,
  removeFromCart,
  cartItems,
}: ProductItemWithSkeletonProps) => {
  return isLoading ? (
    <ProductItemSkeletons />
  ) : (
    products.map((product) => (
      <ProductItem
        key={product.id}
        product={product}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        isInCart={isInCart(cartItems, product.id)}
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
