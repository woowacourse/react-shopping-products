import {useState} from 'react';
import {CartProduct, Product} from '../type/product';
import {getProducts} from '../api/getProducts';
import {getCartProduct} from '../../cart/api/getCartProduct';

function useGetProductsWithCart(sortValue: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setIsLoading(true);
    setError('');

    try {
      const products = await getProducts({sortValue});
      const cartProducts = await getCartProduct();

      const rawProducts = products.content;
      const cartProductIds = new Set(
        cartProducts.content.map((cp: CartProduct) => cp.product.id)
      );

      const productsWithCartInfo = rawProducts.map((product: Product) => ({
        ...product,
        isCart: cartProductIds.has(product.id),
        cartProductId: cartProducts.content.find(
          (cp: CartProduct) => cp.product.id === product.id
        )?.id,
      }));

      setProducts(productsWithCartInfo);
      setPageInfo({
        totalElements: products.totalElements,
        totalPages: products.totalPages,
      });
    } catch (error) {
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {products, fetchProducts, isLoading, error};
}

export default useGetProductsWithCart;
