import DropdownContext from './DropdownContext';
import { PropsWithChildren, useEffect, useRef, useState, useMemo } from 'react';
import Banner from './Banner';
import Item from './Item';
import styles from './dropdown.module.css';

function Dropdown({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (value: string, option: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const handleToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      isOpen,
      selectedOption,
      handleToggleIsOpen,
      handleOptionClick,
    }),
    [isOpen, selectedOption, handleToggleIsOpen, handleOptionClick],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={selectRef}>
        <div className={styles.container}>{children}</div>
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Banner = Banner;
Dropdown.Item = Item;

export default Dropdown;
