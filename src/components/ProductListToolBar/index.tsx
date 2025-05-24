import { css } from '@emotion/css';
import FilterDropDown from './FilterDropDown';
import SortingDropDown from './SortingDropDown';
import { CATEGORY, SORT_OPTION } from './toolBar.constant';
import { useDataContext } from '../../contexts/useDataContext';

const ProductListToolBar = () => {
  const { setCategory, setSort } = useDataContext();

  return (
    <section className={ToolBarSectionStyles}>
      <h1>bpple 상품 목록</h1>
      <div className={ProductListToolBarStyles}>
        <FilterDropDown
          options={CATEGORY}
          handleChange={(e) => setCategory(e.target.value)}
        />
        <SortingDropDown
          options={SORT_OPTION}
          handleChange={(e) =>
            setSort(
              e.target.value === '낮은 가격순' ? 'price,asc' : 'price,desc'
            )
          }
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
