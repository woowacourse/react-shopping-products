import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import Toast from './ui/components/Toast/Toast';
import LoadingSpinner from './ui/components/LoadingSpinner/LoadingSpinner';
import { Global } from '@emotion/react';
import { DropdownContainer, Section } from './App.styles';
import Dropdown from './ui/components/Dropdown/Dropdown';
import ProductList from './ui/components/ProductList/ProductList';
import Title from './ui/components/Title/Title';
import { CATEGORY, SORT_PRICE } from './constants/productConfig';
import {
  PRODUCT_SECTION_TITLE,
  SHOPPING_MALL_TITLE,
} from './constants/shopInfoConfig';
import { useProductListContext } from './context/ProductContext';
import { useCartListContext } from './context/CartContext';
import { useEffect } from 'react';
import { useToastContext } from './context/ToastContext';

function App() {
  const {
    isLoading: isProductLoading,
    error: productError,
    category,
    sortBy,
    handleSortPrice,
    handleFilterCategory,
  } = useProductListContext();

  const {
    isLoading: isCartLoading,
    error: cartError,
    handleAddCart,
    handleRemoveCart,
  } = useCartListContext();

  const { toast, showToast } = useToastContext();

  useEffect(() => {
    if (productError.isError) {
      showToast(productError.errorMessage);
    }
    if (cartError.isError) {
      showToast(cartError.errorMessage);
    }
  }, [productError.isError, cartError.isError]);

  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title={SHOPPING_MALL_TITLE} />
        {toast.isToast && <Toast message={toast.message} />}
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
