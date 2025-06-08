import { sortOptions } from "../../../../features/product/config/filter";
import { useProduct } from "../../../../features/product/hooks/useProduct";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

const ProductSorter = () => {
  const { sortOption, setSortOption } = useProduct();

  return (
    <SelectBox
      value={sortOption}
      onChange={setSortOption}
      options={sortOptions}
    />
  );
};

export default ProductSorter;
