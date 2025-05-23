import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import Toast from './ui/components/Toast/Toast';
import LoadingSpinner from './ui/components/LoadingSpinner/LoadingSpinner';
import { Global } from '@emotion/react';
import React from 'react';
import { CategoryType, ProductElement, SortKeyType } from './types/type';
import { DropdownContainer, Section } from './App.styles';
import Dropdown from './ui/components/Dropdown/Dropdown';
import ProductList from './ui/components/ProductList/ProductList';
import Title from './ui/components/Title/Title';
import { CATEGORY, SORT_PRICE } from './constants/productConfig';
import {
  PRODUCT_SECTION_TITLE,
  SHOPPING_MALL_TITLE,
} from './constants/shopInfoConfig';
import { MAX_CART_ITEM_COUNT } from './constants/cartConfig';
import { ERROR_MESSAGE } from './constants/errorMessage';
import { addCart, removeCart } from './api/fetchCart';
import { useProductListContext } from './context/ProductContext';
import { useCartListContext } from './context/CartContext';
import { getCartId } from './utils/getCartId';

function App() {
  const {
    isLoading: isProductLoading,
    error: productError,
    fetchData: fetchProductData,
    category,
    setCategory,
    sortBy,
    // setSortBy,
    // handleSortPrice,
  } = useProductListContext();

  const {
    cartList,
    isLoading: isCartLoading,
    error: cartError,
    fetchData: fetchCartData,
  } = useCartListContext();

  const handleAddCart = async (product: ProductElement) => {
    if (cartList?.length === MAX_CART_ITEM_COUNT) {
      console.error(ERROR_MESSAGE.MAX_CART_ITEM);
      // setIsError(true);
      return;
    }

    try {
      await addCart(product.id);
      await fetchProductData();
      await fetchCartData();
    } catch (error) {
      console.error(error);
      // setIsError(true);
    }
  };

  const handleRemoveCart = async (product: ProductElement) => {
    try {
      if (product) {
        const cartId = getCartId(cartList, product.id);
        await removeCart(cartId);
        await fetchProductData();
        await fetchCartData();
      }
    } catch (error) {
      console.error(error);
      // setIsError(true);
    }
  };

  const handleFilterCategory = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;

    if (CATEGORY.includes(value as CategoryType)) {
      setCategory(value as CategoryType);
      // await fetchProductData(value);
    }
  };

  const handleSortPrice = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (SORT_PRICE.includes(value as SortKeyType)) {
      setSortBy(value as SortKeyType);
      // await fetchProductData(value);
    }
  };

  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title={SHOPPING_MALL_TITLE} />
        {(!productError || !cartError) && (
          <Toast message={ERROR_MESSAGE.TOAST} />
        )}
        {isProductLoading || (isCartLoading && <LoadingSpinner duration={2} />)}
        {!isProductLoading && !isCartLoading && (
          <Section>
            <Title title={PRODUCT_SECTION_TITLE} />
            <DropdownContainer>
              <Dropdown
                value={category}
                options={CATEGORY}
                onChange={handleFilterCategory}
              />
              <Dropdown
                value={sortBy}
                options={SORT_PRICE}
                onChange={handleSortPrice}
              />
            </DropdownContainer>
            <ProductList
              onAddCart={handleAddCart}
              onRemoveCart={handleRemoveCart}
            />
          </Section>
        )}
      </Layout>
    </>
  );
}

export default App;
