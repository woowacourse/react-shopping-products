import React, { Dispatch, SetStateAction } from 'react';
import { SortingParam } from '../../types/sort';

interface DropdownProps {
  sortings: SortingParam[];
  filter: string;
  setSortings: Dispatch<SetStateAction<SortingParam[]>>;
  setFilter: Dispatch<SetStateAction<string>>;
}

function Dropdown({ sortings, filter, setSortings, setFilter }: DropdownProps) {
  (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.target.value;
  };

  return (
    <div>
      <select
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setFilter(event.target.value);
        }}
      >
        <option value={''}>전체</option>
        <option value={'fashion'}>fashion</option>
        <option value={'beverage'}>beverage</option>
        <option value={'electronics'}>electronics</option>
        <option value={'kitchen'}>kitchen</option>
        <option value={'fitness'}>fitness</option>
        <option value={'books'}>books</option>
        <option value={'animal'}>animal</option>
      </select>

      <select
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setSortings([
            { name: 'price', order: event.target.value } as SortingParam,
          ]);
        }}
      >
        <option value={'asc'}>낮은 가격 순</option>
        <option value={'desc'}>높은 가격 순</option>
      </select>
    </div>
  );
}

export default Dropdown;
