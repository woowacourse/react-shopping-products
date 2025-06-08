import { useProducts } from "../../../../features/product/hooks/useProducts";
import { categoryOptions } from "../../../../features/product/config/filter";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

const CategoryFilter = () => {
  const { category, setCategory } = useProducts();

  return (
    <SelectBox
      value={category}
      onChange={setCategory}
      options={categoryOptions}
    />
  );
};

export default CategoryFilter;
