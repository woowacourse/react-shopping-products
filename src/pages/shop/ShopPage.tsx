import { ErrorToastMessage, Flex } from '@/components/common';
import { CartModal } from '@/components/features/cart';
import styled from '@emotion/styled';
import { Modal } from '@jae-o/modal-component-module';
import { useState } from 'react';
import { ShopFilter, ShopHeader, ShopProductList } from './components';

function ShopPage() {
  const [filter, setFilter] = useState({
    category: '전체',
    sort: 'asc',
  });

  const handleCategoryOption = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSortOption = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  return (
    <Modal>
      <ShopHeader />
      <ProductListContainer>
        <ListTitleBox>
          <ListTitle>Apple 상품 목록</ListTitle>
          <ShopFilter
            filter={filter}
            handleCategoryOption={handleCategoryOption}
            handleSortOption={handleSortOption}
          />
        </ListTitleBox>
        <ShopProductList filter={filter} />
        <ErrorToastMessage />
      </ProductListContainer>
      <CartModal />
    </Modal>
  );
}

const ProductListContainer = styled(Flex)`
  position: relative;
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
