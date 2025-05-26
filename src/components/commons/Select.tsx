import { css } from '@emotion/react';
import { useState } from 'react';

type SelectPropsType<T extends string> = {
  optionList: T[];
  value: T | null;
  setValue: (args: T) => Promise<void>;
  id: string;
};

const Select = <T extends string>({
  optionList,
  value,
  setValue,
  id,
}: SelectPropsType<T>) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const toggleDropdownOpened = () => setIsDropdownOpened((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpened(false);
  const handleOption = (v: T) => {
    setValue(v);
    setIsDropdownOpened(false);
  };

  return (
    <div
      tabIndex={0}
      onBlur={closeDropdown}
      css={selectBoxStyle}
      id={id}
      role="listbox"
      aria-expanded={isDropdownOpened}
      aria-activedescendant={value ? `${id}-option-${value}` : undefined}
    >
      <div
        css={selectedValueStyle(isDropdownOpened)}
        onClick={toggleDropdownOpened}
      >
        <div
          css={selectedValueTextStyle(Boolean(value))}
          aria-label={value ?? '선택해 주세요.'}
        >
          {value ?? '선택해 주세요.'}
        </div>
        <img
          css={iconStyle}
          src={isDropdownOpened ? 'chevron-up.svg' : 'chevron-down.svg'}
          alt=""
          aria-hidden="true"
        />
      </div>
      {isDropdownOpened && (
        <ul css={optionListStyle}>
          {optionList.map((option) => (
            <li
              key={option}
              id={`${id}-option-${option}`}
              css={optionStyle}
              onClick={() => handleOption(option)}
              role="option"
              aria-selected={value === option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

const selectBoxStyle = css`
  width: 130px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;
  position: relative;
`;

const selectedValueStyle = (idDropdownOpened: boolean) => css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
  border: 1px solid ${idDropdownOpened ? '#000000' : 'lightgray'};
  border-radius: 5px;
  cursor: pointer;
`;
const selectedValueTextStyle = (isSelected: boolean) => css`
  font-size: 14px;
  color: ${isSelected ? '#000000' : '#ACACAC'};
  padding: 0 0 0 8px;
`;
const iconStyle = css`
  width: 16px;
  height: 8px;
  padding: 0 8px 0 0;
`;
const optionListStyle = css`
  width: 100%;
  border: 1px solid #acacac;
  border-radius: 5.31px;
  z-index: 200;
  overflow-y: auto;
  position: absolute;
  top: 120%;
`;
const optionStyle = css`
  display: flex;
  align-items: center;
  height: 30.94px;
  background-color: white;
  color: #4f4f4f;
  font-size: 14px;
  font-weight: 400;
  list-style: none;
  padding: 8px 10px;
  cursor: pointer;
`;
