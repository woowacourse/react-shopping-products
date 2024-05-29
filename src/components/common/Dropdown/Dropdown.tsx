import { OptionItem } from '@/types';
import { ChangeEvent } from 'react';

type DropdownProps = {
  optionList: OptionItem[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function Dropdown({ optionList, onChange }: DropdownProps) {
  return (
    <select onChange={onChange}>
      {optionList.map((optionItem, index) => (
        <option key={index} value={optionItem.value}>
          {optionItem.option}
        </option>
      ))}
    </select>
  );
}
