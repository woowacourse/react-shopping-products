import { useProducts } from "../../../../entities/product/model/useProducts";
import { sortOptions } from "../../../../shared/config/filter";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

const ProductSorter = () => {
  const { selectedSortOption, setSelectedSortOption } = useProducts();

  return (
    <SelectBox
      value={selectedSortOption}
      onChange={setSelectedSortOption}
      options={sortOptions}
    />
  );
};

export default ProductSorter;
