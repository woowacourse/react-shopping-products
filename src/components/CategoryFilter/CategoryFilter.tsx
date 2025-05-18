import { Dispatch } from "react";
import SelectBox from "../@common/SelectBox/SelectBox";
import { categoryOptions, CategoryOptionsKey } from "../../constants";

interface CategoryFilterProps {
  selectedCategory: CategoryOptionsKey;
  setSelectedCategory: Dispatch<React.SetStateAction<CategoryOptionsKey>>;
}

const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) => {
  return (
    <SelectBox
      id="category"
      state={selectedCategory}
      setState={setSelectedCategory}
      options={categoryOptions}
    />
  );
};

export default CategoryFilter;
