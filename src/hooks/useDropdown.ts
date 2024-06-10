import { useEffect, useState } from 'react';

interface UseDropdownProps<T> {
  optionList: [T, string][];
  onChange: (value: T) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const useDropdown = <T extends string>({
  optionList,
  onChange,
  dropdownRef,
}: UseDropdownProps<T>) => {
  const [isOpened, setIsOpened] = useState(false);
  const [preview, setPreview] = useState(optionList[0][1]);

  const handleToggleDropdown = () => {
    setIsOpened(!isOpened);
  };

  const handleChangeOption = ([key, value]: [T, string]) => {
    onChange(key);
    setPreview(value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return { isOpened, preview, handleChangeOption, handleToggleDropdown };
};

export default useDropdown;
