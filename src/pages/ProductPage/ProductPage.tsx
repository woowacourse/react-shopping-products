import * as Styled from './ProductPage.styled';

import { lazy, useState } from 'react';

import CategoryDropdown from '@components/product/CategoryDropdown/CategoryDropdown';
import SortDropdown from '@components/product/SortDropdown/SortDropdown';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useProducts from '@hooks/product/useProductItems';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';

const CardList = lazy(() => import('@components/product/CardList/CardList'));

interface ProductPageProps extends React.PropsWithChildren {
  toggleId: (id: number) => void;
  getIsCheckedId: (id: number) => boolean;
}

const ProductPage = ({ toggleId, getIsCheckedId }: ProductPageProps) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState(false);

  const {
    products,
    category,
    sortType,
    isLoading,
    updateNextProductItem,
    onSelectSortTypeOption,
    onSelectCategoryOption,
  } = useProducts();

  const targetRef = useIntersectionObserver<HTMLDivElement>({ onIntersect: updateNextProductItem });

  return (
    <>
      <Styled.ProductPageTitle>bapple 상품 목록</Styled.ProductPageTitle>
      <Styled.ProductDropdownWrapper>
        <CategoryDropdown
          isOpen={isCategoryDropdownOpen}
          category={category}
          onSelectCategoryOption={onSelectCategoryOption}
          onToggleDropdown={() => setIsCategoryDropdownOpen((prev) => !prev)}
        />
        <SortDropdown
          isOpen={isSortTypeDropdownOpen}
          sortType={sortType}
          onSelectSortTypeOption={onSelectSortTypeOption}
          onToggleDropdown={() => setIsSortTypeDropdownOpen((prev) => !prev)}
        />
      </Styled.ProductDropdownWrapper>

      {products.length === 0 ? (
        <LoadingSpinner $width="100%" $height="80vh" />
      ) : (
        <Styled.ProductPageListWrapper>
          <CardList products={products} onToggleCart={toggleId} isAddedCart={getIsCheckedId} />
        </Styled.ProductPageListWrapper>
      )}

      {isLoading && <LoadingSpinner $width="100%" $height="30vh" />}

      <div style={{ height: '1px', width: '100%' }} ref={targetRef} />
    </>
  );
};

export default ProductPage;
