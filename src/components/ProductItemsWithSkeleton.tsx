import { CartItem, Product } from '../App';
import isInCart from '../utils/isIncart';
import ProductItem from './ProductItem';
import ProductItemSkeleton from './ProductItem/ProductItemSkeleton';

type ProductItemWithSkeletonProps = {
  isLoading: boolean;
  products: Product[];
  cartItems: CartItem[];
  increaseCartItemQuantity: (productId: number) => void;
  decreaseCartItemQuantity: (productId: number) => void;
  isCartItemsLoading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
};

const ProductItemsWithSkeleton = ({
  products,
  isLoading,
  cartItems,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  isCartItemsLoading,
  addToCart,
  removeFromCart,
}: ProductItemWithSkeletonProps) => {
  return isLoading ? (
    <ProductItemSkeletons />
  ) : (
    products.map((product) => {
      const cartItem = cartItems.find((item) => item.product.id === product.id);
      const cartItemQuantity = cartItem ? cartItem.quantity : 0;
      return (
        <ProductItem
          key={product.id}
          product={product}
          cartItemQuantity={cartItemQuantity}
          increaseCartItemQuantity={increaseCartItemQuantity}
          decreaseCartItemQuantity={decreaseCartItemQuantity}
          isInCart={isInCart(cartItems, product.id)}
          isCartItemsLoading={isCartItemsLoading}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      );
    })
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
