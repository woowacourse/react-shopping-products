import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import Toast from './ui/components/Toast/Toast';
import LoadingSpinner from './ui/components/LoadingSpinner/LoadingSpinner';
import { Global } from '@emotion/react';
import React, { useState } from 'react';
import { addCart, removeCart } from './api/cart';
import { useProducts } from './hooks/useProducts';
import { CategoryType, SortType, ProductElement } from './types/product';
import { DropdownContainer, Section } from './App.styles';
import Dropdown from './ui/components/Dropdown/Dropdown';
import ProductList from './ui/components/ProductList/ProductList';
import Title from './ui/components/Title/Title';
import {
  CATEGORY,
  SORT_PRICE,
  SORT_PRICE_MAP,
} from './constants/productConfig';
import {
  PRODUCT_SECTION_TITLE,
  SHOPPING_MALL_TITLE,
} from './constants/shopInfoConfig';
import { MAX_CART_ITEM_COUNT } from './constants/cartConfig';

function App() {
  const [sort, setSort] = useState<SortType>('낮은 가격 순');
  const [category, setCategory] = useState<CategoryType>('전체');

  const mappedSortType = SORT_PRICE_MAP[sort];

  const { products, cart, isLoading, isError, setIsError, fetchData } =
    useProducts(mappedSortType, category);

  const handleAddCart = async (product: ProductElement) => {
    if (cart?.totalElements === MAX_CART_ITEM_COUNT) {
      console.error('최대 장바구니 갯수는 50개 입니다.');
      setIsError(true);
      return;
    }

    try {
      await addCart(product.id);
      await fetchData();
    } catch {
      console.error('장바구니 추가 실패');
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
      await fetchData();
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

  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header
          title={SHOPPING_MALL_TITLE}
          totalCartProducts={cart && cart.totalElements}
        />
        {isError && (
          <Toast message="오류가 발생했습니다. 잠시 후 다시 시도해 주세요." />
        )}
        {isLoading && <LoadingSpinner duration={2} />}
        {!isLoading && (
          <Section>
            <Title title={PRODUCT_SECTION_TITLE} />
            <DropdownContainer>
              <Dropdown
                value={category}
                options={CATEGORY}
                onChange={handleFilterCategory}
              />
              <Dropdown
                value={sort}
                options={SORT_PRICE}
                onChange={handleSortPrice}
              />
            </DropdownContainer>
            <ProductList
              onAddCart={handleAddCart}
              onRemoveCart={handleRemoveCart}
              products={products}
            />
          </Section>
        )}
      </Layout>
    </>
  );
}

export default App;
