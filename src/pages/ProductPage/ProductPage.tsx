import * as Styled from './ProductPage.styled';

import { Suspense, useState } from 'react';

import Card from '@components/product/Card/Card';
import CategoryDropdown from '@components/product/CategoryDropdown/CategoryDropdown';
import SortDropdown from '@components/product/SortDropdown/SortDropdown';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useProducts from '@hooks/product/useProductItems';

interface ProductPageProps extends React.PropsWithChildren {
  toggleId: (id: number) => void;
  getIsCheckedId: (id: number) => boolean;
}

const ProductPage = ({ toggleId, getIsCheckedId }: ProductPageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState(false);

  const {
    products,
    category,
    sortType,
    updateNextPage,
    onSelectSortTypeOption,
    onSelectCategoryOption,
  } = useProducts();

  const targetRef = useIntersectionObserver<HTMLDivElement>({ onIntersect: updateNextPage });

  return (
    <>
      <Styled.ProductPageTitle>bapple 상품 목록</Styled.ProductPageTitle>
      <Styled.ProductDropdownWrapper>
        <CategoryDropdown
          onSelectCategoryOption={onSelectCategoryOption}
          onToggleDropdown={() => setIsOpen((prev) => !prev)}
          isOpen={isOpen}
          category={category}
        />
        <SortDropdown
          isOpen={isSortTypeDropdownOpen}
          sortType={sortType}
          onSelectSortTypeOption={onSelectSortTypeOption}
          onToggleDropdown={() => setIsSortTypeDropdownOpen((prev) => !prev)}
        />
      </Styled.ProductDropdownWrapper>
      <Styled.ProductPageListWrapper>
        {products.length === 0 ? (
          <div style={{ width: '100%', height: '100vh' }}>상품 목록이 없어용 ㅜ</div>
        ) : (
          <Suspense fallback={<div style={{ width: '100%', height: '100vh' }}>로딩 중...</div>}>
            {products.map((product, index) => (
              <Card
                key={`${product.id}-${index}`}
                product={product}
                onToggleCart={() => toggleId(product.id)}
                isAddedCart={!getIsCheckedId(product.id)}
              />
            ))}
          </Suspense>
        )}
      </Styled.ProductPageListWrapper>
      <div style={{ height: '1px', width: '100%' }} ref={targetRef} />
    </>
  );
};

export default ProductPage;
