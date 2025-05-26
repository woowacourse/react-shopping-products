import { useProducts } from "../../../../entities/product/useProducts";
import { sortOptions } from "../../../../shared/config/filter";
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
