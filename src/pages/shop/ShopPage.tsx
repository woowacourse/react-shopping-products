import { Suspense, useState } from 'react';
import Dropdown, { DropdownOptionType } from '../../components/common/Dropdown';
import ShopHeader from '../../components/features/header/ShopHeader';
import ProductList from '../../components/features/product/product-list/ProductList';
import Flex from '../../components/common/Flex';
import styled from '@emotion/styled';
import { baseAPI } from '../../api/baseAPI';
import { ProductData } from '../../api/type';
import Loading from '../../components/common/Loading';
import { wrapPromise } from '../../api/wrapPromise';
import { Product } from '../../components/features/product/type';
import { convertResponseToProduct } from '../../components/features/product/responseMapper';
import { useCartContext } from '../../context/useCartContext';

function ShopPage() {
  const [filterOption, setFilterOption] = useState({
    category: { label: '전체', value: '전체' },
    sort: { label: '낮은 가격순', value: 'asc' },
  });

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

  const getListDataHandler = async () => {
    const page = 0;
    const size = 20;
    const categoryPath =
      filterOption.category.value !== '전체'
        ? `category=${filterOption.category.value}&`
        : '';
    const basePath = `/products?${categoryPath}page=${page}&size=${size}&sort=price,${filterOption.sort.value}`;

    const data = await baseAPI<ProductData>({
      method: 'GET',
      path: basePath,
    });
    const productsData = data?.content.map((product) =>
      convertResponseToProduct(product)
    );
    return productsData ?? [];
  };

  return (
    <>
      <ShopHeader itemsCount={cartList.length} />
      <ProductListContainer>
        <ListTitleBox>
          <ListTitle>Apple 상품 목록</ListTitle>
          <Flex flexDirection="row" justifyContent="space-between">
            <Dropdown
              options={[
                { label: '전체', value: '전체' },
                { label: '식료품', value: '식료품' },
                { label: '패션잡화', value: '패션잡화' },
              ]}
              selectedValue={filterOption.category}
              onSelectHandler={handleCategoryOption}
            />
            <Dropdown
              options={[
                { label: '낮은 가격순', value: 'asc' },
                { label: '높은 가격순', value: 'desc' },
              ]}
              selectedValue={filterOption.sort}
              onSelectHandler={handleSortOption}
            />
          </Flex>
        </ListTitleBox>
        <Suspense fallback={<Loading />}>
          <ProductList
            resource={wrapPromise<Product[]>(getListDataHandler())}
            cartList={cartList}
          />
        </Suspense>
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
