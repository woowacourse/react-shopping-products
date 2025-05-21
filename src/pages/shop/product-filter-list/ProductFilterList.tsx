import styled from '@emotion/styled';
import { Suspense, useMemo, useState } from 'react';
import { wrapPromise } from '../../../api/wrapPromise';
import { Flex, Loading } from '../../../components/common';
import { DropdownOptionType } from '../../../components/common/Dropdown';
import ProductList from '../../../components/features/product/product-list/ProductList';
import ShopFilter from '../../../shop/components/filter/ShopFilter';
import { getProductsData } from '../../../api/getListData';

function ProductFilterList() {
  const [filterOption, setFilterOption] = useState({
    category: { label: '전체', value: '전체' },
    sort: { label: '낮은 가격순', value: 'asc' },
  });

  const listPromiseData = useMemo(
    () => getProductsData(filterOption),
    [filterOption]
  );

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
    <ProductListContainer>
      <ListTitleBox>
        <ListTitle>Apple 상품 목록</ListTitle>
        <ShopFilter
          filterOption={filterOption}
          handleCategoryOption={handleCategoryOption}
          handleSortOption={handleSortOption}
        />
      </ListTitleBox>
      <Suspense fallback={<Loading />}>
        <ProductList resource={wrapPromise(listPromiseData)} />
      </Suspense>
    </ProductListContainer>
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

export default ProductFilterList;
