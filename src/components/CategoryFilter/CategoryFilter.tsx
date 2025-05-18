import SelectBox from "../@common/SelectBox/SelectBox";
import { CategoryOptions, CategoryOptionsKey } from "../../constants";
import { useProductFilter } from "../../hooks/useProductFilter";

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useProductFilter();
  return (
    <SelectBox<CategoryOptionsKey>
      testIdPrefix="category"
      value={selectedCategory}
      onChange={setSelectedCategory}
      options={CategoryOptions}
    />
  );
};

export default CategoryFilter;
