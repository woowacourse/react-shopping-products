import Header from '../../component/@common/Header';
import {
  ShoppingListFilterStyle,
  ShoppingListStyle,
  ShoppingListTitleStyle,
} from './ShoppingList.styles';
import Text from '../../component/@common/Text';
import Dropdown from '../../component/@common/Dropdown';
import { useState } from 'react';
import ArrowIcon from '../../component/@common/ArrowIcon';

export type SortOption = '높은 가격순' | '낮은 가격순';
export type CategoryOption = '전체';

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
    </>
  );
};

export default ShoppingList;
