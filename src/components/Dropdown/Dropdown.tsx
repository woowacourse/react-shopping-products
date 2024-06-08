import React, { Dispatch, SetStateAction } from 'react';
import { Order, Orders, SortingParam } from '../../types/sort';
import * as S from './Dropdown.styled';

interface DropdownProps {
  setSortings: Dispatch<SetStateAction<SortingParam[]>>;
  setFilter: Dispatch<SetStateAction<Category>>;
}

const Dropdown = ({ setSortings, setFilter }: DropdownProps) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isCategory(event.target.value)) setFilter(event.target.value);
  };
  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isOrder(event.target.value))
      setSortings([{ name: 'price', order: event.target.value }]);
  };

  return (
    <S.DropdownContainer>
      <S.Dropdown onChange={handleFilterChange}>
        {Object.keys(OPTIONS).map(
          (value: string) =>
            isCategory(value) && (
              <option value={value}>{OPTIONS[value]}</option>
            ),
        )}
      </S.Dropdown>

      <S.Dropdown onChange={handleSortingChange}>
        <option value={'asc'}>낮은 가격 순</option>
        <option value={'desc'}>높은 가격 순</option>
      </S.Dropdown>
    </S.DropdownContainer>
  );
};

const OPTIONS = {
  '': '전체',
  fashion: '패션',
  beverage: '음료',
  electronics: '전자기기',
  kitchen: '주방용품',
  fitness: '운동기구',
  books: '도서',
  animal: '애완용품',
} as const;

export type Category = keyof typeof OPTIONS;

const isCategory = (str: string): str is Category => {
  return Object.keys(OPTIONS).includes(str);
};

const isOrder = (str: string): str is Order => {
  return Orders.includes(str);
};

export default Dropdown;
