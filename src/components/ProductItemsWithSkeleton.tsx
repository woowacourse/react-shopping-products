import useCartItems from '../hooks/useCartItems';
import useProducts from '../hooks/useProducts';
import isInCart from '../utils/isIncart';
import ProductItemListCard from './ProductItem/ProductItemListCard';
import ProductItemSkeleton from './ProductItem/ProductItemSkeleton';

const ProductItemsWithSkeleton = () => {
  const { cartItems } = useCartItems();

  const { products, isLoading } = useProducts({
    category: '전체',
    priceOrder: '낮은 가격순',
  });

  return isLoading ? (
    <ProductItemSkeletons />
  ) : (
    products.map((product) => {
      const cartItem = cartItems.find((item) => item.product.id === product.id);
      const cartItemQuantity = cartItem ? cartItem.quantity : 0;
      return (
        <ProductItemListCard
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
