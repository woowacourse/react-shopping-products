import Dropdown from '../common/Dropdown/Dropdown';
import { CATEGORY_OPTION_LIST } from '@/constants/filter';
import styles from '../common/Dropdown/dropdown.module.css';

export default function FilterDropdown() {
  return (
    <Dropdown>
      <Dropdown.Banner>전체</Dropdown.Banner>
      <ul className={styles.ulContainer}>
        {CATEGORY_OPTION_LIST.map((listItem, index) => (
          <Dropdown.Item key={index} option={listItem.option} value={listItem.option}>
            {listItem.option}
          </Dropdown.Item>
        ))}
      </ul>
    </Dropdown>
  );
}
