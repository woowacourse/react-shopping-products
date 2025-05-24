import { wrapPromise } from '@/api/wrapPromise';
import { ErrorToastMessage, Flex, Loading } from '@/components/common';
import CartModal from '@/components/features/cart/CartModal';
import { getProductList } from '@/components/features/product/api/getProductList';
import { Product } from '@/components/features/product/type';
import { useCartContext } from '@/context/useCartContext';
import styled from '@emotion/styled';
import { Modal } from '@jae-o/modal-component-module';
import { Suspense, useMemo, useState } from 'react';
import { ShopFilter, ShopHeader, ShopProductList } from './components';
import { useShopErrorContext } from './context';

function ShopPage() {
  const [filter, setFilter] = useState({
    category: '전체',
    sort: 'asc',
  });
  const { isError } = useShopErrorContext();
  const { cartList } = useCartContext();

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

  const listPromiseData = useMemo(() => getProductList(filter), [filter]);

  return (
    <Modal>
      <ShopHeader itemsCount={cartList.length} />
      <ProductListContainer>
        <ListTitleBox>
          <ListTitle>Apple 상품 목록</ListTitle>
          <ShopFilter
            filter={filter}
            handleCategoryOption={handleCategoryOption}
            handleSortOption={handleSortOption}
          />
        </ListTitleBox>
        <Suspense fallback={<Loading />}>
          <ShopProductList
            resource={wrapPromise<Product[]>(listPromiseData)}
            cartList={cartList}
          />
        </Suspense>
        {isError && <ErrorToastMessage />}
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
