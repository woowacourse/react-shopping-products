import { useState } from 'react';

import Card from '@components/product/Card/Card';
import CategoryDropdown from '@components/product/CategoryDropdown/CategoryDropdown';
import SortDropdown from '@components/product/SortDropdown/SortDropdown';

import { Product } from '@appTypes/product';

import useProducts from '@hooks/product/useProductItems';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

import * as Styled from './ProductPage.styled';

interface ProductPageProps extends React.PropsWithChildren {
  toggleId: (id: number) => void;
  getIsCheckedId: (id: number) => boolean;
}

const ProductPage = ({ toggleId, getIsCheckedId }: ProductPageProps) => {
  const { products, updateNextPage } = useProducts();

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<Product['category'] | 'all'>('all');

  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState(false);
  const [sortType, setSortType] = useState<'row' | 'high'>('row');

  const targetRef = useIntersectionObserver<HTMLDivElement>({ onIntersect: updateNextPage });

  return (
    <>
      <Styled.ProductPageTitle>bapple 상품 목록</Styled.ProductPageTitle>
      <Styled.ProductDropdownWrapper>
        <CategoryDropdown
          onSelectCategoryOption={setCategory}
          onToggleDropdown={() => setIsOpen((prev) => !prev)}
          isOpen={isOpen}
          category={category}
        />
        <SortDropdown
          isOpen={isSortTypeDropdownOpen}
          sortType={sortType}
          onSelectSortTypeOption={setSortType}
          onToggleDropdown={() => setIsSortTypeDropdownOpen((prev) => !prev)}
        />
      </Styled.ProductDropdownWrapper>
      <Styled.ProductPageListWrapper>
        {products.length === 0 ? (
          <div style={{ width: '100%', height: '100vh' }}>상품 목록이 없어용 ㅜ</div>
        ) : (
          products.map((product, index) => (
            <Card
              key={`${product.id}-${index}`}
              product={product}
              onToggleCart={() => toggleId(product.id)}
              isAddedCart={!getIsCheckedId(product.id)}
            />
          ))
        )}
      </Styled.ProductPageListWrapper>
      <div style={{ height: '1px', width: '100%' }} ref={targetRef} />
    </>
  );
};

export default ProductPage;
