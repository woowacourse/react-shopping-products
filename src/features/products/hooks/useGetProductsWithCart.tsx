import { useState, useCallback } from 'react';
import { CartProduct, Product, ProductDTO } from '../type/product';
import { getProducts } from '../api/getProducts';
import { getCartProduct } from '../../cart/api/getCartProduct';

function useGetProductsWithCart(sortValue: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [productRes, cartRes] = await Promise.all([
        getProducts({ sortValue }),
        getCartProduct({ page: 0, size: 20 }),
      ]);

      const cartProductIds = new Set(cartRes.content.map((cp: CartProduct) => cp.product.id));

      const mergedProducts = productRes.content.map((product: ProductDTO) => ({
        ...product,
        isCart: cartProductIds.has(product.id),
        cartProductId: cartRes.content.find((cp: CartProduct) => cp.product.id === product.id)?.id,
      }));

      setProducts(mergedProducts);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching products or cart:', error);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [sortValue]);

  return { products, fetchProducts, isLoading, error };
}

export default useGetProductsWithCart;
