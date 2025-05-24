import { Dispatch } from "react";
import {
  categoryOptions,
  CategoryOptionsKey,
} from "../../../../shared/config/filter";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

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
