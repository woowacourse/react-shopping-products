import * as Styled from './ProductPage.styled';

import { useState } from 'react';

import CategoryDropdown from '@components/product/CategoryDropdown/CategoryDropdown';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import SortDropdown from '@components/product/SortDropdown/SortDropdown';
import CardList from '@components/product/CardList/CardList';
import NotProduct from '@components/product/NotProduct/NotProduct';

import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useProducts from '@hooks/product/useProductItems/useProductItems';

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
    updateNextProductItem,
    onSelectSortTypeOption,
    onSelectCategoryOption,
  } = useProducts();

  const targetRef = useIntersectionObserver<HTMLDivElement>({ onIntersect: updateNextProductItem });

  console.log('zz');
  return (
    <>
      <Styled.ProductPageTitle>bpple 상품 목록</Styled.ProductPageTitle>
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
        <NotProduct />
      ) : (
        <Styled.ProductPageListWrapper>
          <CardList products={products} onToggleCart={onToggleCart} isAddedCart={isAddedCart} />
        </Styled.ProductPageListWrapper>
      )}

      {products.length !== 0 && isLoading && <LoadingSpinner $width="100%" $height="30vh" />}

      <Styled.ObserverTarget ref={targetRef} />
    </>
  );
};

export default ProductPage;
