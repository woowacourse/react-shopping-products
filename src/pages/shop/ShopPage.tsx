import { wrapPromise } from '@/api/wrapPromise';
import { ErrorToastMessage, Flex, Loading } from '@/components/common';
import { getProductList } from '@/components/features/product/api/getProductList';
import ProductList from '@/components/features/product/product-list/ProductList';
import { Product } from '@/components/features/product/type';
import { useCartContext } from '@/context/useCartContext';
import ShopFilter from '@/shop/components/filter/ShopFilter';
import ShopHeader from '@/shop/components/header/ShopHeader';
import { useShopErrorContext } from '@/shop/context/useShopErrorContext';
import styled from '@emotion/styled';
import { Suspense, useMemo, useState } from 'react';
import { Modal } from '@jae-o/modal-component-module';
import ProductRowCard from '@/components/features/product/product-card/ProductRowCard';

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
          <ProductList
            resource={wrapPromise<Product[]>(listPromiseData)}
            cartList={cartList}
          />
        </Suspense>
        {isError && <ErrorToastMessage />}
      </ProductListContainer>
      <Modal.Container
        title="장바구니"
        showCloseButton={false}
        position="bottom"
        style={{ maxHeight: 'calc(100% - 120px)', overflow: 'auto' }}
      >
        {cartList.map(({ id, product }) => {
          const matchingCart = cartList.find(
            (cart) => cart.product.id === product.id
          );
          return (
            <Flex>
              <Separator />
              <ProductRowCard
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                cartId={id}
                isInCart={!!matchingCart}
              />
            </Flex>
          );
        })}
        <Modal.CloseTrigger>
          <Modal.WideButton>닫기</Modal.WideButton>
        </Modal.CloseTrigger>
      </Modal.Container>
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

const Separator = styled.div`
  width: 100%;
  border: 1px solid #0000001a;
`;

export default ShopPage;
