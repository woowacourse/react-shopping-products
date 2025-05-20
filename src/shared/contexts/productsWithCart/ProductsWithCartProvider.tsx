import React, { createContext, useState, useCallback } from 'react';
import { ProductsWithCartContextValue } from './types';
import { CartProduct, Product, ProductDTO } from '../../../features/products/type/product';
import { getProducts } from '../../../features/products/api/getProducts';
import { getCartProduct } from '../../../features/cart/api/getCartProduct';
import { addCartProduct } from '../../../features/cart/api/addCartProduct';
import { updateCartProduct } from '../../../features/cart/api/updateCartProduct';
import { deleteCartProduct } from '../../../features/cart/api/deleteCartProduct';

export const ProductsWithCartContext = createContext<ProductsWithCartContextValue | undefined>(undefined);

interface ProductsWithCartProviderProps {
  children: React.ReactNode;
}

export const ProductsWithCartProvider = ({ children }: ProductsWithCartProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [sortValue, setSortValue] = useState<string>('');
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

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

      setCartProducts(cartRes.content);
      const cartProductIds = new Set(cartRes.content.map((cp: CartProduct) => cp.product.id));

      const mergedProducts = productRes.content.map((product: ProductDTO) => {
        const cartProduct = cartRes.content.find((cp: CartProduct) => cp.product.id === product.id);
        return {
          ...product,
          isCart: cartProductIds.has(product.id),
          cartProductQuantity: cartProduct?.quantity || 0,
          cartProductId: cartProduct?.id,
        };
      });

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

  const toggleCartSelection = (productId: number) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const updateCart = async (newCart: { productId: number; cartProductId: number; cartProductQuantity: number }) => {
    setIsLoading(true);
    setError('');

    try {
      const cartRes = await getCartProduct({ page: 0, size: 20 });
      // 장바구니(Cart)에 요청하는 product가 없으면 POST
      const findResult = cartRes.content.find((cp: CartProduct) => cp.product.id === newCart.productId);

      if (!findResult || newCart.cartProductId === -1) {
        await addCartProduct(newCart.productId);
        await fetchProducts();
        return;
      }

      // 있으면 PATCH
      await updateCartProduct(newCart.cartProductId, newCart.cartProductQuantity);
      await fetchProducts();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating cart:', error);
        setError('장바구니 업데이트 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartProductId: number, productId: number) => {
    setIsLoading(true);
    setError('');

    try {
      await deleteCartProduct(cartProductId);

      setSelectedProductIds((prev) => prev.filter((id) => id !== productId));

      await fetchProducts();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error removing from cart:', error);
        setError('장바구니에서 상품 삭제 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductsWithCartContext.Provider
      value={{
        products,
        cartProducts,
        isLoading,
        error,
        fetchProducts,
        updateCart,
        removeFromCart,
        sortValue,
        setSortValue,
        selectedProductIds,
        toggleCartSelection,
      }}
    >
      {children}
    </ProductsWithCartContext.Provider>
  );
};
