import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import Toast from './ui/components/Toast/Toast';
import ProductSection from './ui/components/ProductSection/ProductSection';
import LoadingSpinner from './ui/components/LoadingSpinner/LoadingSpinner';
import { Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { addCart, getCartItem, removeCart } from './api/cart';
import { getProduct } from './api/product.ts';
import {
  CategoryType,
  SortType,
  CartResponse,
  ProductElement,
  CartItem,
} from './types/product';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<ProductElement[]>([]);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [sort, setSort] = useState<SortType>('낮은 가격 순');
  const [category, setCategory] = useState<CategoryType>('전체');

  const mappedSortType = sort === '낮은 가격 순' ? 'asc' : 'desc';

  const handleAddCart = async (product: ProductElement) => {
    if (cart?.totalElements === 50) {
      console.error('최대 장바구니 갯수는 50개 입니다.');
      setIsError(true);
      return;
    }

    try {
      await addCart(product.id);
      await fetchData(mappedSortType);
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      setIsError(true);
    }
  };

  const handleRemoveCart = async (product: ProductElement) => {
    if (!product.cartId) {
      console.error('유효하지 않은 장바구니 ID');
      setIsError(true);
      return;
    }

    try {
      await removeCart(product.cartId);
      await fetchData(mappedSortType);
    } catch (error) {
      console.error('장바구니 제거 실패:', error);
      setIsError(true);
    }
  };

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === '전체' || value === '식료품' || value === '패션잡화')
      setCategory(value);
  };

  const handleSortPrice = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === '낮은 가격 순' || value === '높은 가격 순') {
      setSort(value);
    }
  };

  const fetchData = async (mappedSortType: string) => {
    setIsLoading(true);
    try {
      const product = await getProduct(mappedSortType);
      const cart = await getCartItem();

      const filteredCategory = product.content.filter(
        (item: ProductElement) =>
          category === '전체' || item.category === category
      );

      const data = (filteredCategory || []).map((item: ProductElement) => {
        const cartItem = cart.content.find(
          (cartItem: CartItem) => cartItem.product.id === item.id
        );

        return {
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category,
          imageUrl: item.imageUrl,
          isInCart: cartItem ? 1 : 0,
          cartId: cartItem ? cartItem.id : undefined,
        };
      });

      setData(data);
      setCart(cart);
    } catch (e) {
      setIsError(true);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(mappedSortType);
  }, [sort, category]);

  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title="SHOP" totalCartProducts={cart && cart.totalElements} />
        {isError && (
          <Toast message="오류가 발생했습니다. 잠시 후 다시 시도해 주세요." />
        )}
        {isLoading && <LoadingSpinner duration={2} />}
        {!isLoading && (
          <ProductSection
            onFilter={handleFilterCategory}
            onSort={handleSortPrice}
            onAddCart={handleAddCart}
            onRemoveCart={handleRemoveCart}
            data={data}
            sort={sort}
            category={category}
          />
        )}
      </Layout>
    </>
  );
}

export default App;
