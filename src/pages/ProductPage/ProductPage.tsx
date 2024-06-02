import * as Styled from './ProductPage.styled';

import { lazy, useState } from 'react';

import AppLayout from '@components/layout/AppLayout/AppLayout';
import Dropdown from '@components/common/Dropdown/Dropdown';
import ITEM_CATEGORIES from '@constants/itemCategories';
import ITEM_SORT_TYPE from '@constants/itemSortTypes';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import WrongCat from '@components/common/WrongCat/WrongCat';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import usePaginatedProducts from '@hooks/product/usePaginatedProducts';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import useToggleShoppingCart from '@hooks/product/useToggleShoppingCart';

const CardList = lazy(() => import('@components/product/CardList/CardList'));

const ProductPage = () => {
  const { showToast } = useToastContext();

  const {
    products,
    category,
    sortType,
    isLoading,
    updateNextProductPage,
    updateCategory,
    updateSortType,
  } = usePaginatedProducts({ errorHandler: showToast });

  const { addedShoppingCartLength, onToggleCart, isAddedCart } =
    useToggleShoppingCart();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState(false);

  const targetRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: updateNextProductPage,
  });

  const wrongCatElement = (
    <WrongCat
      $width='400px'
      $height='400px'
      message={
        '그런 건 내가 다 먹어버렸다냥~\n(사실 등록된 물건이 없는거라고 하네요)'
      }
    />
  );
  const loadingSpinnerElement = <LoadingSpinner $width='100%' $height='30vh' />;

  const itemsElement = (
    <Styled.ProductPageListWrapper>
      <CardList
        products={products}
        onToggleCart={onToggleCart}
        isAddedCart={isAddedCart}
      />
    </Styled.ProductPageListWrapper>
  );

  return (
    <AppLayout itemCount={addedShoppingCartLength}>
      <Styled.ProductPageTitle>bpple 상품 목록</Styled.ProductPageTitle>
      <Styled.ProductDropdownWrapper>
        <Dropdown
          options={ITEM_CATEGORIES}
          nowSelectedOption={category}
          isOpen={isCategoryDropdownOpen}
          setIsOpen={setIsCategoryDropdownOpen}
          setOption={updateCategory}
        />
        <Dropdown
          options={ITEM_SORT_TYPE}
          nowSelectedOption={sortType}
          isOpen={isSortTypeDropdownOpen}
          setIsOpen={setIsSortTypeDropdownOpen}
          setOption={updateSortType}
        />
      </Styled.ProductDropdownWrapper>

      {itemsElement}

      {isLoading && loadingSpinnerElement}
      {!isLoading && products.length === 0 && wrongCatElement}

      {!isLoading && <Styled.ObserverTarget ref={targetRef} />}
    </AppLayout>
  );
};

export default ProductPage;
