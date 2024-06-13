import React, { Dispatch, SetStateAction } from 'react';

import { SortingParam } from '../../types/sort';
import { FILTER, SORTING } from '../../constants/dropdown';

import * as S from './Dropdown.styled';

interface DropdownProps {
  setSortings: Dispatch<SetStateAction<SortingParam[]>>;
  setFilter: Dispatch<SetStateAction<string>>;
}

function Dropdown({ setSortings, setFilter }: DropdownProps) {
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
      <S.Dropdown
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleFilterChange(event)
        }
      >
        {Object.keys(FILTER).map((key) => (
          <option key={key} value={key}>
            {FILTER[key as keyof typeof FILTER]}
          </option>
        ))}
      </S.Dropdown>

      <S.Dropdown
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleSortingChange(event)
        }
      >
        {Object.keys(SORTING).map((key) => (
          <option key={key} value={key}>
            {SORTING[key as keyof typeof SORTING]}
          </option>
        ))}
      </S.Dropdown>
    </S.DropdownContainer>
  );
}

export default Dropdown;
