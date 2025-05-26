import {
  CategoryValue,
  SortValue,
} from "../../Component/Product/ProductListContainer";

export function useProductFilters(
  setCategory: React.Dispatch<React.SetStateAction<CategoryValue>>,
  setPrice: React.Dispatch<React.SetStateAction<SortValue>>
) {
  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value as CategoryValue;
    setCategory(v);
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value as SortValue;
    setPrice(v);
  };

  return { onCategoryChange, onPriceChange };
}
