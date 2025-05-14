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
        <ProductList
          products={[
            {
              id: '139',
              name: '오거스가 침뱉은 커피',
              price: 30000,
              imageUrl:
                'https://cdn.wikifoodie.co.kr/news/photo/202504/2050_5442_3844.jpg',
            },
            {
              id: '140',
              name: '니야의 발냄새나는 운동화',
              price: 938000,
              imageUrl:
                'https://img.danawa.com/prod_img/500000/479/578/img/13578479_1.jpg?_v=20210311181438',
            },
          ]}
        />
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
