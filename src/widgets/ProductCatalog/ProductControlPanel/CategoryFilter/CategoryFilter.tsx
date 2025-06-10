import { categoryOptions } from "../../../../features/product/config/filter";
import { useProduct } from "../../../../features/product/hooks/useProduct";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

const CategoryFilter = () => {
  const { category } = useProduct();

  return (
    <SelectBox
      value={category.value}
      onChange={category.set}
      options={categoryOptions}
    />
  );
};

export default CategoryFilter;
