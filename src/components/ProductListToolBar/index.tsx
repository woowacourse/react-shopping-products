import { css } from "@emotion/css";
import FilterDropDown from "./FilterDropDown";
import SortingDropDown from "./SortingDropDown";

const ProductListToolBar = () => {
  return (
    <section className={ToolBarSectionStyles}>
      <h1>bpple 상품 목록</h1>
      <div className={ProductListToolBarStyles}>
        <FilterDropDown options={["패션잡화", "식료품"]} />
        <SortingDropDown options={["낮은 가격순", "높은 가격순"]} />
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
