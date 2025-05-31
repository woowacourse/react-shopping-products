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
import {
  CATEGORY,
  SORT_PRICE,
  SORT_PRICE_MAP,
} from './constants/productConfig';
import {
  PRODUCT_SECTION_TITLE,
  SHOPPING_MALL_TITLE,
} from './constants/shopInfoConfig';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useToastContext } from './context/ToastContext';
import Modal from './ui/components/Modal/Modal';
import CartModal from './ui/components/CartModal/CartModal';
import {
  CartItem,
  CategoryType,
  ProductElement,
  SortKeyType,
} from './types/type';
import { getCartItem } from './api/fetchCart';
import { useAPI } from './hooks/useAPI';
import { getProduct } from './api/fetchProduct';

function App() {
  const { toastQueue, removeToast } = useToastContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [category, setCategory] = useState<CategoryType>(CATEGORY[0]);
  const [sortBy, setSortBy] = useState<SortKeyType>(SORT_PRICE[0]);

  const mappedSortType = useMemo(() => {
    return SORT_PRICE_MAP[sortBy];
  }, [sortBy]);

  const fetchProductList = useCallback(async () => {
    return await getProduct({ page: 0, size: 50, sortBy: mappedSortType }).then(
      (res) => res.content
    );
  }, [mappedSortType]);

  const { isLoading: isProductLoading } = useAPI<ProductElement[]>({
    fetcher: fetchProductList,
    name: `productList-${mappedSortType}`,
  });

  const fetchCartItems = useCallback(async () => {
    return await getCartItem({ page: 0, size: 50, sortBy: 'desc' }).then(
      (res) => res.content
    );
  }, []);

  const { isLoading: isCartLoading } = useAPI<CartItem[]>({
    fetcher: fetchCartItems,
    name: 'cartItems',
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCategory(value as CategoryType);
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSortBy(value as SortKeyType);
  };

  useEffect(() => {
    if (toastQueue.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toastQueue[0].id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastQueue]);

  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <Header title={SHOPPING_MALL_TITLE} onModalOpen={handleModalOpen} />
        {toastQueue.length > 0 && <Toast message={toastQueue[0].message} />}
        {(isProductLoading || isCartLoading) && <LoadingSpinner duration={2} />}
        {!isProductLoading && !isCartLoading && (
          <Section>
            <Title title={PRODUCT_SECTION_TITLE} />
            <DropdownContainer>
              <Dropdown
                value={category}
                options={CATEGORY}
                onChange={handleCategory}
              />
              <Dropdown
                value={sortBy}
                options={SORT_PRICE}
                onChange={handleSortBy}
              />
            </DropdownContainer>
            <ProductList category={category} sortBy={sortBy} />
          </Section>
        )}
        <Modal isModalOpen={isModalOpen} onModalClose={handleModalClose}>
          <CartModal onClose={handleModalClose} />
        </Modal>
      </Layout>
    </>
  );
}

export default App;
