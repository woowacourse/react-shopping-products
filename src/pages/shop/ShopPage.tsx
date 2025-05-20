import { wrapPromise } from '@/api/wrapPromise';
import { ErrorToastMessage, Flex, Loading } from '@/components/common';
import { DropdownOptionType } from '@/components/common/type';
import { getProductList } from '@/components/features/product/api/getProductList';
import ProductList from '@/components/features/product/product-list/ProductList';
import { Product } from '@/components/features/product/type';
import { useCartContext } from '@/context/useCartContext';
import ShopFilter from '@/shop/components/filter/ShopFilter';
import ShopHeader from '@/shop/components/header/ShopHeader';
import { useShopErrorContext } from '@/shop/context/useShopErrorContext';
import styled from '@emotion/styled';
import { Suspense, useMemo, useState } from 'react';

function ShopPage() {
  const [filterOption, setFilterOption] = useState({
    category: { label: '전체', value: '전체' },
    sort: { label: '낮은 가격순', value: 'asc' },
  });
  const { isError } = useShopErrorContext();
  const { cartList } = useCartContext();

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

  const listPromiseData = useMemo(
    () => getProductList(filterOption),
    [filterOption]
  );

  return (
    <>
      <ShopHeader itemsCount={cartList.length} />
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
          <ProductList
            resource={wrapPromise<Product[]>(listPromiseData)}
            cartList={cartList}
          />
        </Suspense>
        {isError && <ErrorToastMessage />}
      </ProductListContainer>
    </>
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
