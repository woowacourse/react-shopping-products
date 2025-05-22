import { useMemo } from 'react';
import { useProducts } from './useProducts';
import { useCart } from './useCart';

export function useProductsWithCart(sortType: string, category: string = '전체') {
  const {
    products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    setIsError: setProductsError,
    fetchProduct
  } = useProducts(sortType, category);

  const {
    cart,
    isLoading: isCartLoading,
    isError: isCartError,
    setIsError: setCartError,
    fetchCart,
    isInCart,
    getCartItemId
  } = useCart();

  const isLoading = isProductsLoading || isCartLoading;
  const isError = isProductsError || isCartError;

  const productsWithCartInfo = useMemo(() => {
    const productArray = Array.isArray(products) ? products : [];

    return productArray.map(product => ({
      ...product,
      isInCart: isInCart(product.id) ? 1 : 0,
      cartId: getCartItemId(product.id)
    }));
  }, [products, isInCart, getCartItemId]);

  const resetErrors = () => {
    setProductsError(false);
    setCartError(false);
  };

  return {
    productsWithCartInfo,
    cart,
    isLoading,
    isError,
    resetErrors,
    fetchCart,
    fetchProduct
  };
}
