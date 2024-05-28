import Select from '../../../components/Select/Select';
import { productCategories, sortOptions } from '../../../constant/products';
import styles from '../ProductListPage.module.css';

const ProductListSelectBar = () => {
  return (
    <div className={styles.productSelectContainer}>
      <Select options={productCategories} defaultValue={'all'}>
        <option key="all" value="all">
          전체
        </option>
      </Select>
      <Select options={sortOptions} defaultValue={'낮은 가격순'} />
    </div>
  );
};

export default ProductListSelectBar;
