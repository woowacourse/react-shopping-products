import { Dispatch } from "react";
import SelectBox from "../@common/SelectBox/SelectBox";
import { CategoryOptions, CategoryOptionsKey } from "../../constants";

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
      state={selectedCategory}
      setState={setSelectedCategory}
      options={CategoryOptions}
    />
  );
};

export default CategoryFilter;
