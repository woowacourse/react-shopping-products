import { useMemo } from 'react';
import { useProducts } from './useProducts';
import { useCart } from './useCart';
import { CategoryType, ProductElement, SortKeyType } from '../types/product';

export function useProductsWithCart(
  sortType: SortKeyType = 'asc',
  category: CategoryType = '전체',
) {
  const {
    products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    fetchProduct,
  } = useProducts(sortType, category);

  const {
    cart,
    isLoading: isCartLoading,
    isError: isCartError,
    fetchCart,
    isInCart,
    getCartItemId,
  } = useCart();

  const isLoading = isProductsLoading || isCartLoading;
  const isError = isProductsError || isCartError;

  const productsWithCartInfo = useMemo(() => {
    const productArray = Array.isArray(products) ? products : [];

    return productArray.map((product) => ({
      ...product,
      isInCart: isInCart(product.id),
      cartId: getCartItemId(product.id),
    }));
  }, [products, isInCart, getCartItemId]);

  const transformedProducts: ProductElement[] = productsWithCartInfo.map((item) => ({
    product: {
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      category: item.category,
      quantity: item.quantity,
    },
    isInCart: item.isInCart,
    cartId: item.cartId,
  }));

  return {
    transformedProducts,
    cart,
    isLoading,
    isError,
    fetchCart,
    fetchProduct,
  };
}
