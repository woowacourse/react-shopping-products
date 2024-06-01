import * as Styled from './ProductPage.styled';

import { lazy, useState } from 'react';

import CategoryDropdown from '@components/product/CategoryDropdown/CategoryDropdown';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import SortDropdown from '@components/product/SortDropdown/SortDropdown';
import WrongCat from '@components/common/WrongCat/WrongCat';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import usePaginatedProducts from '@hooks/product/usePaginatedProducts';

const CardList = lazy(() => import('@components/product/CardList/CardList'));

interface ProductPageProps extends React.PropsWithChildren {
  onToggleCart: (id: number) => void;
  isAddedCart: (id: number) => boolean;
}

const ProductPage = ({ onToggleCart, isAddedCart }: ProductPageProps) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState(false);

  const {
    products,
    category,
    sortType,
    isLoading,
    updateNextProductPage,
    onSelectSortTypeOption,
    onSelectCategoryOption,
  } = usePaginatedProducts();

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
    <>
      <Styled.ProductPageTitle>bpple 상품 목록</Styled.ProductPageTitle>
      <Styled.ProductDropdownWrapper>
        <CategoryDropdown
          isOpen={isCategoryDropdownOpen}
          category={category}
          onSelectCategoryOption={onSelectCategoryOption}
          onToggleDropdown={() => setIsCategoryDropdownOpen(prev => !prev)}
        />
        <SortDropdown
          isOpen={isSortTypeDropdownOpen}
          sortType={sortType}
          onSelectSortTypeOption={onSelectSortTypeOption}
          onToggleDropdown={() => setIsSortTypeDropdownOpen(prev => !prev)}
        />
      </Styled.ProductDropdownWrapper>

      {itemsElement}

      {isLoading && products.length > 0 && loadingSpinnerElement}
      {!isLoading && products.length === 0 && wrongCatElement}

      <Styled.ObserverTarget ref={targetRef} />
    </>
  );
};

export default ProductPage;
