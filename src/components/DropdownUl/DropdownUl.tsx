import { useRef, useState, useEffect } from 'react';
import styles from './DropdownUl.module.css';
import ImageBox from '../common/ImageBox/ImageBox';
import downArrowIcon from '@/assets/DownArrow.svg';

type SelectOption = {
  option: string;
  value: string;
};

type Props = {
  optionList: SelectOption[];
  bannerText: string;
  onChange: (value: string) => void;
};

export default function DropdownUl({ optionList, bannerText, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(bannerText);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (option: string, value: string) => {
    onChange(value);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSelectBoxToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={selectRef}>
      <div className={styles.container}>
        <div className={styles.option} onClick={handleSelectBoxToggle}>
          {selectedOption}
          <ImageBox src={downArrowIcon} width={20} height={20} />
        </div>
        <ul className={`${styles.ulContainer} ${isOpen ? styles.visible : styles.hidden}`}>
          {optionList.map(
            (item, index) =>
              selectedOption !== item.option && (
                <li
                  key={index}
                  data-value={item.value}
                  className={styles.option}
                  onClick={() => handleOptionClick(item.option, item.value)}
                >
                  {item.option}
                </li>
              ),
          )}
        </ul>
      </div>
    </div>
  );
}
