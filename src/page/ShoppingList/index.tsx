import Header from '../../component/@common/Header';
import {
  ShoppingListFilterStyle,
  ShoppingListStyle,
  ShoppingListTitleStyle
} from './ShoppingList.styles';
import Text from '../../component/@common/Text';
import Dropdown from '../../component/@common/Dropdown';
import { useState } from 'react';
import ArrowIcon from '../../component/@common/ArrowIcon';
import ProductCard from '../../component/feature/ProductCard';
import ProductListLayout from '../../component/feature/ProductListLayout';

export type SortOption = '높은 가격순' | '낮은 가격순';
export type CategoryOption = '전체';

const products = [
  {
    id: 1,
    name: '리바이트 블루투스 헤드셋',
    price: 10000,
    imageUrl: './public/image/default.png',
    category: '패션'
  },
  {
    id: 2,
    name: '리바이트 블루투스 헤드셋',
    price: 10000,
    imageUrl: './public/image/default.png',
    category: '잡화'
  },
  {
    id: 3,
    name: '리바이트 블루투스 스피커',
    price: 10000,
    imageUrl: './public/image/default.png',
    category: '패션'
  },
  {
    id: 4,
    name: '리바이트 블루투스 이어폰',
    price: 10000,
    imageUrl: './public/image/default.png',
    category: '패션'
  }
];

const ShoppingList = () => {
  const [selected, setSelected] = useState<SortOption>('낮은 가격순');
  const [category, setCategory] = useState<CategoryOption>('전체');

  const handleSortClick = (content: SortOption) => {
    setSelected(content);
  };

  const sortOptions: SortOption[] = ['높은 가격순', '낮은 가격순'];

  return (
    <>
      <Header />
      <section css={ShoppingListStyle}>
        <div css={ShoppingListTitleStyle}>
          <Text variant="title">bpple 상품 목록</Text>
          <div css={ShoppingListFilterStyle}>
            <Dropdown.Root>
              <Dropdown.Trigger>
                {category}
                <ArrowIcon />
              </Dropdown.Trigger>
            </Dropdown.Root>

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
      </section>
      <ProductListLayout>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductListLayout>
    </>
  );
};

export default ShoppingList;
