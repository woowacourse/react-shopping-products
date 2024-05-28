import { Dropdown } from '@src/components';
import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from '@src/constants';

import ProductList from './ProductList';
import style from './style.module.css';

function ProductListPage() {
  return (
    <div>
      <h1 className="page__title">bpple 상품 목록</h1>
      <div className={style.dropdownGroup}>
        <Dropdown label="카테고리" options={CATEGORY_OPTIONS} onChange={() => console.log('')} />
        <Dropdown label="가격순" options={PRICE_SORT_OPTIONS} onChange={() => console.log('')} />
      </div>
      <ProductList />
    </div>
  );
}

export default ProductListPage;
