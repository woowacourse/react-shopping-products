import { useEffect, useState } from 'react';
import Dropdown, { DropdownOptionType } from '../../components/common/Dropdown';
import ShopHeader from '../../components/features/header/ShopHeader';
import ProductList from '../../components/features/product/product-list/ProductList';
import Flex from '../../components/common/Flex';
import styled from '@emotion/styled';
import { ProductData } from '../../api/type';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: ProductCategoryType;
}
type ProductCategoryType = 'all' | 'food' | 'fashion';

function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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

  const getListData = async ({
    page,
    size,
  }: {
    page: number;
    size: number;
  }) => {
    const result = await fetch(
      `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products?page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(
            `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
          )}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!result.ok) {
      throw new Error('에러가 났어요~');
    }
    const data = (await result.json()) as ProductData;

    return data;
  };

  useEffect(() => {
    const getListDataHandler = async () => {
      try {
        const data = await getListData({ page: 0, size: 20 });
        const productsData = data.content.map(
          ({ id, name, price, imageUrl, category }) => ({
            id: id.toString(),
            name: name ?? '',
            price,
            imageUrl: imageUrl ?? 'defaultImage',
            category: (category ?? 'all') as ProductCategoryType,
          })
        );
        setProducts(productsData);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getListDataHandler();
  }, []);

  if (isLoading) return <div>로딩중 입니다~</div>;

  if (isError) return <div>에러가 났어요~!</div>;

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
        <ProductList products={products} />
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
