import { useProducts } from "../../../../entities/product/model/useProducts";
import { categoryOptions } from "../../../../shared/config/filter";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useProducts();

  return (
    <SelectBox
      value={selectedCategory}
      onChange={setSelectedCategory}
      options={categoryOptions}
    />
  );
};

export default CategoryFilter;
