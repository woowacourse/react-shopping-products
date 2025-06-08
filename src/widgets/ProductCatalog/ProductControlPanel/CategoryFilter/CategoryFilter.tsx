import { categoryOptions } from "../../../../features/product/config/filter";
import { useProduct } from "../../../../features/product/hooks/useProduct";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

const CategoryFilter = () => {
  const { category, setCategory } = useProduct();

  return (
    <SelectBox
      value={category}
      onChange={setCategory}
      options={categoryOptions}
    />
  );
};

export default CategoryFilter;
