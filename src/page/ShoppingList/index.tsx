import Header from '../../component/@common/Header';
import {
  ShoppingListFilterItemStyle,
  ShoppingListFilterStyle,
  ShoppingListStyle,
  ShoppingListTitleStyle,
} from './ShoppingList.styles';
import Text from '../../component/@common/Text';
import Dropdown from '../../component/@common/Dropdown';
import { useEffect, useState } from 'react';
import ArrowIcon from '../../component/@common/ArrowIcon';
import ProductCard from '../../component/feature/ProductCard';
import ProductListLayout from '../../component/feature/ProductListLayout';
import { Product } from '../../types/response';

export type SortOption = '높은 가격순' | '낮은 가격순';
export type CategoryOption = '전체' | '패션잡화' | '식료품';

const ShoppingList = () => {
  const [selected, setSelected] = useState<SortOption>('낮은 가격순');
  const [category, setCategory] = useState<CategoryOption>('전체');
  const [data, setData] = useState([]);
  const categoryOptions: CategoryOption[] = ['전체', '패션잡화', '식료품'];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products?page=0&size=20${
          category === '전체' ? '' : `&category=${category}`
        }${
          selected === '높은 가격순' ? '&sort=price,desc' : '&sort=price,asc'
        }`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const results = await response.json();
      setData(results.content);
    };
    fetchData();
  }, [category, selected]);

  const handleSortClick = (content: string) => {
    setSelected(content as SortOption);
  };

  const handleCategoryClick = (category: string) => {
    setCategory(category as CategoryOption);
  };

  const sortOptions: SortOption[] = ['높은 가격순', '낮은 가격순'];

  return (
    <>
      <Header />
      <section css={ShoppingListStyle}>
        <div css={ShoppingListTitleStyle}>
          <Text variant="title">bpple 상품 목록</Text>
          <div css={ShoppingListFilterStyle}>
            <div css={ShoppingListFilterItemStyle}>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  {category}
                  <ArrowIcon />
                </Dropdown.Trigger>
                <Dropdown.List>
                  {categoryOptions.map((option) => (
                    <Dropdown.Item
                      key={option}
                      handleClick={handleCategoryClick}
                      content={option}
                    />
                  ))}
                </Dropdown.List>
              </Dropdown.Root>
            </div>

            <div css={ShoppingListFilterItemStyle}>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  {selected}
                  <ArrowIcon />
                </Dropdown.Trigger>
                <Dropdown.List>
                  {sortOptions.map((option) => (
                    <Dropdown.Item
                      key={option}
                      handleClick={handleSortClick}
                      content={option}
                    />
                  ))}
                </Dropdown.List>
              </Dropdown.Root>
            </div>
          </div>
        </div>
      </section>
      <ProductListLayout>
        {data.map((product: Product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ProductListLayout>
    </>
  );
};

export default ShoppingList;
