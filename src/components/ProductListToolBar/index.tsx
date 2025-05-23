import { css } from '@emotion/css';
import FilterDropDown from './FilterDropDown';
import SortingDropDown from './SortingDropDown';
import { useProductsContext } from '../../contexts/useProductsContext';
import { CATEGORY, SORT_OPTION } from './toolBar.constant';
import { isCategory, isSortOption } from '../../utils/typeGuard';

const ProductListToolBar = () => {
  const products = useProductsContext();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (isCategory(CATEGORY, value)) {
      products.updateCategory(value);
    }
  };

  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (isSortOption(SORT_OPTION, value)) {
      products.updateSort(value);
    }
  };

  return (
    <section className={ToolBarSectionStyles}>
      <h1>bpple 상품 목록</h1>
      <div className={ProductListToolBarStyles}>
        <FilterDropDown options={CATEGORY} handleChange={handleFilterChange} />
        <SortingDropDown
          options={SORT_OPTION}
          handleChange={handleSortingChange}
        />
      </div>
    </section>
  );
};

export default ProductListToolBar;

const ToolBarSectionStyles = css`
  width: 100%;
  margin-top: 64px;
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: center;
`;

const ProductListToolBarStyles = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
