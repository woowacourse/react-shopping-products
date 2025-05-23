import { Dispatch } from "react";
import SelectBox from "../@common/SelectBox/SelectBox";
import { categoryOptions, CategoryOptionsKey } from "../../constants/filter";

interface Props {
  selectedCategory: CategoryOptionsKey;
  setSelectedCategory: Dispatch<React.SetStateAction<CategoryOptionsKey>>;
}

const CategoryFilter = ({ selectedCategory, setSelectedCategory }: Props) => {
  return (
    <SelectBox
      value={selectedCategory}
      onChange={setSelectedCategory}
      options={categoryOptions}
    />
  );
};

export default CategoryFilter;
