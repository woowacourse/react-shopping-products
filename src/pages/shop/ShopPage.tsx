import { useEffect, useState } from 'react';
import Dropdown, { DropdownOptionType } from '../../components/common/Dropdown';
import ShopHeader from '../../components/features/header/ShopHeader';
import ProductList from '../../components/features/product/product-list/ProductList';
import Flex from '../../components/common/Flex';
import styled from '@emotion/styled';
import { baseAPI } from '../../api/baseAPI';
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
    category: { label: '전체', value: '전체' },
    sort: { label: '낮은 가격순', value: 'asc' },
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

  useEffect(() => {
    const getListDataHandler = async () => {
      const page = 0;
      const size = 20;
      const categoryPath =
        filterOption.category.value !== '전체'
          ? `category=${filterOption.category.value}&`
          : '';
      const basePath = `/products?${categoryPath}page=${page}&size=${size}&sort=price,${filterOption.sort.value}`;
      try {
        const data = await baseAPI<ProductData>({
          method: 'GET',
          path: basePath,
        });
        const productsData = data.content.map(
          ({ id, name, price, imageUrl, category }) => ({
            id: id.toString(),
            name: name ?? '',
            price,
            imageUrl: imageUrl ?? 'defaultImage',
            category: (category ?? '전체') as ProductCategoryType,
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
  }, [filterOption]);

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
