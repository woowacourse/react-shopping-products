import { useClickOutsideRef } from '@/hooks/useClickOutsideRef';
import styled from '@emotion/styled';
import { ComponentProps, useState } from 'react';
import Arrow from './Arrow';

interface DropdownProps<T extends { label: string; value: string }> {
  options: T[];
  selectedValue: string | null;
  onSelectOption: (optionValue: string) => void;
  placeholder?: string;
}

function Dropdown<T extends { label: string; value: string }>({
  options,
  selectedValue,
  onSelectOption,
  placeholder,
  ...props
}: DropdownProps<T> & ComponentProps<'div'>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useClickOutsideRef<HTMLDivElement>(() => setOpen(false));

  const toggle = () => setOpen((prev) => !prev);

  const selectedLabel = options.find(
    (option) => option.value === selectedValue
  )?.label;

  const onOptionSelected = (value: string) => {
    setOpen(false);
    onSelectOption(value);
  };

  return (
    <DropdownContainer ref={dropdownRef} {...props}>
      <DropdownToggle onClick={toggle}>
        <DropdownText isSelected={selectedValue !== null}>
          {selectedLabel || (placeholder ?? '')}
        </DropdownText>
        <Arrow width={16} direction={open ? 'up' : 'down'} />
      </DropdownToggle>
      <DropdownMenu isOpen={open}>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            data-value={option.value}
            onClick={() => onOptionSelected(option.value)}
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
