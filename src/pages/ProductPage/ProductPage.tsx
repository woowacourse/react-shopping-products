import useProducts from '@hooks/product/useProductItems';

import Card from '@components/product/Card/Card';

import * as Styled from './ProductPage.styled';
import CategoryDropdown from '@components/product/CategoryDropdown/CategoryDropdown';
import { useState } from 'react';
import { Product } from '@appTypes/product';
import SortDropdown from '@components/product/SortDropdown/SortDropdown';
import useToggleShoppingCartItem from '@hooks/product/useCheckedIds';

const ProductPage = () => {
  const { products } = useProducts();

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<Product['category'] | 'all'>('all');

  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState(false);
  const [sortType, setSortType] = useState<'row' | 'high'>('row');

  const { toggleId, getIsCheckedId } = useToggleShoppingCartItem();

  return (
    <>
      <Styled.ProductPageTitle>bapple 상품 목록</Styled.ProductPageTitle>
      <Styled.ProductDropdownWrapper>
        <CategoryDropdown
          onSelectCategoryOption={(value) => {
            setCategory(value);
          }}
          onToggleDropdown={() => setIsOpen((prev) => !prev)}
          isOpen={isOpen}
          category={category}
        />
        <SortDropdown
          isOpen={isSortTypeDropdownOpen}
          sortType={sortType}
          onSelectSortTypeOption={(value) => {
            setSortType(value);
          }}
          onToggleDropdown={() => setIsSortTypeDropdownOpen((prev) => !prev)}
        />
      </Styled.ProductDropdownWrapper>
      <Styled.ProductPageListWrapper>
        {products.map((product) => (
          <Card
            key={product.id}
            onToggleCart={() => toggleId(product.id)}
            isAddedCart={!getIsCheckedId(product.id)}
            product={product}
          />
        ))}
      </Styled.ProductPageListWrapper>
    </>
  );
};

export default ProductPage;
