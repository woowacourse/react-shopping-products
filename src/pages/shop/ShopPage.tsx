import { useState } from 'react';
import Dropdown, { DropdownOptionType } from '../../components/common/Dropdown';
import ShopHeader from '../../components/features/header/ShopHeader';
import ProductList from '../../components/features/product/product-list/ProductList';
import Flex from '../../components/common/Flex';
import styled from '@emotion/styled';

function ShopPage() {
  const [filterOption, setFilterOption] = useState({
    category: { label: '전체', value: 'all' },
    sort: { label: '낮은 가격순', value: 'ascending' },
  });

  const handleCategoryOption = (option: DropdownOptionType) => {
    setFilterOption((prev) => ({
      ...prev,
      category: option,
    }));
  };

  const handleSortOption = (option: DropdownOptionType) => {
    setFilterOption((prev) => ({
      ...prev,
      sort: option,
    }));
  };

  return (
    <>
      <ShopHeader />
      <ProductListContainer>
        <ListTitleBox>
          <ListTitle>Apple 상품 목록</ListTitle>
          <Flex flexDirection="row" justifyContent="space-between">
            <Dropdown
              options={[
                { label: '전체', value: 'all' },
                { label: '식료품', value: 'food' },
                { label: '패션잡화', value: 'fashion' },
              ]}
              selectedValue={filterOption.category}
              onSelectHandler={handleCategoryOption}
            />
            <Dropdown
              options={[
                { label: '낮은 가격순', value: 'ascending' },
                { label: '높은 가격순', value: 'descending' },
              ]}
              selectedValue={filterOption.sort}
              onSelectHandler={handleSortOption}
            />
          </Flex>
        </ListTitleBox>
        <ProductList />
      </ProductListContainer>
    </>
  );
}

const ProductListContainer = styled(Flex)`
  padding: 36px 24px;
  gap: 28px;
`;

const ListTitleBox = styled(Flex)`
  align-items: flex-start;
  gap: 24px;
`;

const ListTitle = styled.h2`
  ${({ theme }) => theme.heading};
`;

export default ShopPage;
