import React, { useEffect, useRef, useState } from 'react';

import * as Styled from './Dropdown.styled';

import { IMAGES } from '@/assets';
import { Category, SortOption } from '@/types/product';

interface DropdownProps {
  value: string;
  options: SortOption[] | Category[];
  handleSelect: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const Dropdown = ({ value, options, handleSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClose = (e: MouseEvent) => {
      const isOutsideDropdown = isOpen && !dropMenuRef.current?.contains(e.target as Node);
      if (isOutsideDropdown) setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpen]);

  return (
    <Styled.SelectBox ref={dropMenuRef} $isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
      <Styled.LabelWrapper>
        <Styled.SelectedText $value={value}>{value || '선택해주세요'}</Styled.SelectedText>
        <img src={isOpen ? IMAGES.ARROW_DOWN : IMAGES.ARROW_UP} alt="드랍다운 방향" />
      </Styled.LabelWrapper>
      <Styled.SelectOptions $isOpen={isOpen} $count={options.length}>
        {isOpen &&
          options.map((data) => (
            <Styled.Option key={data.value} data-value={data.value} onClick={handleSelect}>
              {data.label}
            </Styled.Option>
          ))}
      </Styled.SelectOptions>
    </Styled.SelectBox>
  );
};

export default Dropdown;
