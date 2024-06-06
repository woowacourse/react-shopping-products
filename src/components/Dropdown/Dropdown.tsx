import React, { Dispatch, SetStateAction } from 'react';
import { SortingParam } from '../../types/sort';
import * as S from './Dropdown.styled';

interface DropdownProps {
  setSortings: Dispatch<SetStateAction<SortingParam[]>>;
  setFilter: Dispatch<SetStateAction<string>>;
}

const OPTIONS: Record<string, string> = {
  '': '전체',
  fashion: '패션',
  beverage: '음료',
  electronics: '전자기기',
  kitchen: '주방용품',
  fitness: '운동기구',
  books: '도서',
  animal: '애완용품',
};

const Dropdown = ({ setSortings, setFilter }: DropdownProps) => {
  (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.target.value;
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };
  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortings([{ name: 'price', order: event.target.value } as SortingParam]);
  };

  return (
    <S.DropdownContainer>
      <S.Dropdown onChange={handleFilterChange}>
        {Object.keys(OPTIONS).map((value) => (
          <option value={value}>{OPTIONS[value]}</option>
        ))}
      </S.Dropdown>

      <S.Dropdown onChange={handleSortingChange}>
        <option value={'asc'}>낮은 가격 순</option>
        <option value={'desc'}>높은 가격 순</option>
      </S.Dropdown>
    </S.DropdownContainer>
  );
};

export default Dropdown;
