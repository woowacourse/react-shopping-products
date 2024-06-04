import { useRef, useState, useEffect } from 'react';
import styles from './Dropdown.module.css';
import ImageBox from '../common/ImageBox/ImageBox';
import downArrowIcon from '@/assets/DownArrow.svg';
import { OptionItem } from '@/types/filter.type';
import handleClickOutside from '@/utils/handleClickOutside';

type DropdownProps = {
  optionList: OptionItem<string>[];
  bannerText: string;
  onChange: (value: string) => void;
};

export default function Dropdown({ optionList, bannerText, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(bannerText);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (option: { value: string; name: string }) => {
    setSelectedOption(option.name);
    setIsOpen(false);
    onChange(option.value);
  };

  const handleOptionListToggle = () => setIsOpen((prevState) => !prevState);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) =>
      handleClickOutside(e, selectRef, () => setIsOpen(false));

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={selectRef}>
      <div className={styles.container}>
        <div className={styles['selected-option']} onClick={handleOptionListToggle}>
          {selectedOption}
          <ImageBox src={downArrowIcon} width={20} height={20} />
        </div>
        <ul className={`${styles.ul} ${isOpen ? styles.visible : styles.hidden}`}>
          {optionList.map(
            ({ name, value }) =>
              selectedOption !== name && (
                <li
                  key={value}
                  className={styles.option}
                  onClick={() => handleOptionClick({ name, value })}
                >
                  {name}
                </li>
              ),
          )}
        </ul>
      </div>
    </div>
  );
}
