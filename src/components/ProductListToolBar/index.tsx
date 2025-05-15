import { css } from "@emotion/css";
import FilterDropDown from "./FilterDropDown";
import SortingDropDown from "./SortingDropDown";
import { useProductsContext } from "../../contexts/useProductsContext";
import fetchProducts from "../../APIs/fetchProducts";
import { useCallback } from "react";
import { Category, SortOption } from "../../types/product.type";

const ProductListToolBar = () => {
  const {
    handleChangeProducts,
    handleChangeSort,
    handleChangeCategory,
    category,
    sort,
  } = useProductsContext();

  const handleFilterChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const params = {
        page: "0",
        size: "20",
        sort,
      };
      const query = new URLSearchParams(params).toString();
      const endpoint =
        e.target.value === "전체"
          ? `/products?${query}`
          : `/products?${query}&category=${e.target.value}`;
      const { content } = await fetchProducts({ endpoint });
      handleChangeProducts(content);
      handleChangeCategory(e.target.value as Category);
    },
    [handleChangeProducts, handleChangeCategory, sort]
  );

  const handleSortingChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const params = {
        page: "0",
        size: "20",
        sort: e.target.value === "낮은 가격순" ? "price,asc" : "price,desc",
      };
      const query = new URLSearchParams(params).toString();
      const endpoint = `/products?${query}&category=${category}`;
      const { content } = await fetchProducts({ endpoint });
      handleChangeProducts(content);
      handleChangeSort(e.target.value as SortOption);
    },
    [handleChangeProducts, handleChangeSort, category]
  );

  return (
    <section className={ToolBarSectionStyles}>
      <h1>bpple 상품 목록</h1>
      <div className={ProductListToolBarStyles}>
        <FilterDropDown
          options={["전체", "패션잡화", "식료품"]}
          handleChange={handleFilterChange}
        />
        <SortingDropDown
          options={["낮은 가격순", "높은 가격순"]}
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
