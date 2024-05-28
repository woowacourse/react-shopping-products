import { SelectHTMLAttributes, PropsWithChildren } from 'react';
import { productCategories, sortOptions } from '../../constant/products';
import styles from './Select.module.css';

interface Props extends PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>> {
  options: string[] | typeof productCategories | typeof sortOptions;
}

const Select = ({ options, defaultValue, children, ...props }: Props) => {
  return (
    <select {...props} className={styles.selectContainer} defaultValue={defaultValue}>
      {children}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
