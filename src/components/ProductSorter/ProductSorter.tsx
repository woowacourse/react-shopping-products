import SelectBox from "../@common/SelectBox/SelectBox";
import { sortOptions } from "../../constants";
import { useProductFilter } from "../../hooks/useProductFilter";

const ProductSorter = () => {
  const { selectedSortOption, setSelectedSortOption } = useProductFilter();
  return (
    <SelectBox
      testIdPrefix="sort"
      value={selectedSortOption}
      onChange={setSelectedSortOption}
      options={sortOptions}
    />
  );
};

export default ProductSorter;
