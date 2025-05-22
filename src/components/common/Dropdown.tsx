import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';

export type DropdownOptionType = {
  label: string;
  value: string;
};

function Dropdown({
  options,
  selectedValue,
  onSelectHandler,
  placeholder,
  ...props
}: {
  options: DropdownOptionType[];
  selectedValue: DropdownOptionType | null;
  onSelectHandler: (option: DropdownOptionType) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSelect = (option: DropdownOptionType) => {
    setOpen(false);
    onSelectHandler(option);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={dropdownRef} {...props}>
      <DropdownToggle onClick={toggleOpen}>
        <DropdownText isSelected={selectedValue !== null}>
          {selectedValue?.label || (placeholder ?? '')}
        </DropdownText>
        <Arrow width={16} direction={open ? 'up' : 'down'} />
      </DropdownToggle>
      <DropdownMenu isOpen={open}>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            data-value={option.value}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  width: 132px;
  height: 36px;
`;

const DropdownToggle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #acacac;
  border-radius: 4px;
  background: white;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
`;

const DropdownText = styled.p<{ isSelected: boolean }>`
  font-weight: 400;
  font-size: 12px;
  color: ${(props) => (props.isSelected ? 'black' : '#acacac')};
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  width: 100%;
  border: 1px solid #acacac;
  border-radius: 4px;
  background: white;
  list-style: none;
  box-sizing: border-box;
  position: absolute;
  margin-top: 4px;
  top: 100%;
  left: 0;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const DropdownMenuItem = styled.li`
  font-weight: 400;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Dropdown;
