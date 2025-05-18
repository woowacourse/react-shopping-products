import SelectBox from "../@common/SelectBox/SelectBox";
import { CategoryOptions } from "../../constants";
import { useProductFilter } from "../../hooks/useProductFilter";

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useProductFilter();
  return (
    <SelectBox
      testIdPrefix="category"
      value={selectedCategory}
      onChange={setSelectedCategory}
      options={CategoryOptions}
    />
  );
};

export default CategoryFilter;
