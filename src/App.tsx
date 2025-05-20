import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import Toast from './ui/components/Toast/Toast';
import LoadingSpinner from './ui/components/LoadingSpinner/LoadingSpinner';
import { Global } from '@emotion/react';
import React, { useState } from 'react';
import { addCart, removeCart } from './api/cart';
import { useProducts } from './hooks/useProducts';
import { CategoryType, SortType, ProductWithCartInfo } from './types/product';
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
import { ERROR_MESSAGE } from './constants/errorMessage';

function App() {
  const [sort, setSort] = useState<SortType>('낮은 가격 순');
  const [category, setCategory] = useState<CategoryType>('전체');

  const mappedSortType = SORT_PRICE_MAP[sort];

  const { products, cart, isLoading, isError, setIsError, fetchData } =
    useProducts(mappedSortType, category);

  const handleAddCart = async (product: ProductWithCartInfo) => {
    if (cart?.totalElements === MAX_CART_ITEM_COUNT) {
      console.error(ERROR_MESSAGE.MAX_CART_ITEM);
      setIsError(true);
      return;
    }

    try {
      await addCart(product.id);
      await fetchData();
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const handleRemoveCart = async (product: ProductWithCartInfo) => {
    try {
      if (product.cartId) {
        await removeCart(product.cartId);
        await fetchData();
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (CATEGORY.includes(value)) {
      setCategory(value as CategoryType);
    }
  };

  const handleSortPrice = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (SORT_PRICE.includes(value)) {
      setSort(value as SortType);
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
        {isError && <Toast message={ERROR_MESSAGE.TOAST} />}
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
