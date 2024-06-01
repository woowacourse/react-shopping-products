import useDropdownContext from './useDropdownContext';
import styles from './dropdown.module.css';
import { PropsWithChildren } from 'react';

type Props = {
  option: string;
  value: string;
};

export default function Item({ children, option, value }: PropsWithChildren<Props>) {
  const { selectedOption, handleOptionClick } = useDropdownContext();

  return selectedOption !== value ? (
    <li
      data-value={value}
      className={styles.option}
      onClick={() => handleOptionClick(option, value)}
    >
      {children}
    </li>
  ) : null;
}
