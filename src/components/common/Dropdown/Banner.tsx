import useDropdownContext from './useDropdownContext';
import styles from './dropdown.module.css';
import downArrowIcon from '@/assets/DownArrow.svg';
import ImageBox from '../ImageBox/ImageBox';
import { PropsWithChildren } from 'react';

export default function Banner({ children }: PropsWithChildren) {
  const { selectedOption, handleToggleIsOpen } = useDropdownContext();

  return (
    <div className={styles.option} onClick={handleToggleIsOpen}>
      {selectedOption || children}
      <ImageBox src={downArrowIcon} width={20} height={20} />
    </div>
  );
}
