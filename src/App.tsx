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
import { SHOP_INFO } from './constants/shopInfoConfig';
import { useEffect, useState } from 'react';
import { useToastContext } from './context/ToastContext';
import Modal from './ui/components/Modal/Modal';
import CartModal from './ui/components/CartModal/CartModal';
import {
  CartItem,
  CategoryType,
  ProductElement,
  SortKeyType,
} from './types/type';
import { useAPI } from './hooks/useAPI';
import { fetchCartItem } from './utils/getCartItem';
import { fetchProductList } from './utils/getProductList';

function App() {
  const { toastQueue, removeToast } = useToastContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [category, setCategory] = useState<CategoryType>(CATEGORY[0]);
  const [sortBy, setSortBy] = useState<SortKeyType>(SORT_PRICE[0]);

  const mappedSortType = SORT_PRICE_MAP[sortBy];

  const { isLoading: isProductLoading } = useAPI<ProductElement[]>({
    fetcher: () => fetchProductList(mappedSortType),
    name: `productList-${mappedSortType}`,
  });

  const { isLoading: isCartLoading } = useAPI<CartItem[]>({
    fetcher: fetchCartItem,
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
        <Header
          title={SHOP_INFO.SHOPPING_MALL_TITLE}
          onModalOpen={handleModalOpen}
        />
        {toastQueue.length > 0 && <Toast message={toastQueue[0].message} />}
        {(isProductLoading || isCartLoading) && <LoadingSpinner duration={2} />}
        {!isProductLoading && !isCartLoading && (
          <Section>
            <Title title={SHOP_INFO.PRODUCT_SECTION_TITLE} />
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
