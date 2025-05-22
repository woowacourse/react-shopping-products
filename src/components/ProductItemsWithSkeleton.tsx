import isInCart from '../utils/isIncart';
import { useCartItemsContext } from './contexts/cartItemsContext';
import { useProductsContext } from './contexts/productsContext';
import ProductItem from './ProductItem';
import ProductItemSkeleton from './ProductItem/ProductItemSkeleton';

const ProductItemsWithSkeleton = () => {
  const { cartItems } = useCartItemsContext();
  const { products, isLoading } = useProductsContext();

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
          isInCart={isInCart(cartItems, product.id)}
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
