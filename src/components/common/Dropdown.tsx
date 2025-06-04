import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';
import { useBoolean } from '../../hooks/useBoolean';

export type DropdownOptionType = {
  label: string;
  value: string;
};
function Dropdown({
  options,
  selectedValue,
  onSelectHandler,
  placeholder,
  autoFocus = false,
  ...props
}: {
  options: DropdownOptionType[];
  selectedValue: DropdownOptionType | null;
  onSelectHandler: (option: DropdownOptionType) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, , closeDropdown, toggleDropdown] = useBoolean(false);

  const toggleOpen = () => {
    toggleDropdown();
    if (!open) {
      const selectedIdx = options.findIndex(
        (option) => option.value === selectedValue?.value
      );
      setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
    }
  };

  const handleSelect = useCallback(
    (option: DropdownOptionType) => {
      closeDropdown();
      onSelectHandler(option);
    },
    [onSelectHandler, closeDropdown]
  );

  useEffect(() => {
    const onCloseOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', onCloseOutsideClick);
    return () => document.removeEventListener('mousedown', onCloseOutsideClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'Escape':
          closeDropdown();
          break;
        case 'ArrowDown':
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          e.preventDefault();
          break;
        case 'ArrowUp':
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          e.preventDefault();
          break;
        case 'Enter':
        case ' ':
          if (focusedIndex >= 0 && open) {
            handleSelect(options[focusedIndex]);
          }
          e.preventDefault();
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, focusedIndex, options, handleSelect, closeDropdown]);

  return (
    <DropdownContainer ref={dropdownRef} {...props}>
      <DropdownToggle onClick={toggleOpen} autoFocus={autoFocus}>
        <DropdownText isSelected={selectedValue !== null}>
          {selectedValue?.label || (placeholder ?? '')}
        </DropdownText>
        <Arrow width={16} direction={open ? 'up' : 'down'} />
      </DropdownToggle>
      <DropdownMenu isOpen={open} role="listbox" tabIndex={-1}>
        {options.map((option, idx) => (
          <DropdownMenuItem
            key={option.value}
            tabIndex={open ? 0 : -1}
            aria-selected={focusedIndex === idx}
            isFocused={focusedIndex === idx}
            role="option"
            onClick={() => handleSelect(option)}
            onMouseEnter={() => setFocusedIndex(idx)}
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

const DropdownToggle = styled.button`
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

const DropdownMenuItem = styled.li<{ isFocused?: boolean }>`
  font-weight: 400;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;
  outline: none;
  background: ${({ isFocused }) => (isFocused ? '#f0f0f0' : 'white')};

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Dropdown;
