import { sortOptions } from "../../../../features/product/config/filter";
import { useProducts } from "../../../../features/product/hooks/useProducts";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

const ProductSorter = () => {
  const { sortOption, setSortOption } = useProducts();

  return (
    <SelectBox
      value={sortOption}
      onChange={setSortOption}
      options={sortOptions}
    />
  );
};

export default ProductSorter;
