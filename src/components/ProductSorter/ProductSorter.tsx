import { Dispatch } from "react";
import SelectBox from "../@common/SelectBox/SelectBox";
import { SortOptionKey, sortOptions } from "../../constants";

interface ProductSorterProps {
  selectedSortOption: SortOptionKey;
  setSelectedSortOption: Dispatch<React.SetStateAction<SortOptionKey>>;
}

const ProductSorter = ({
  selectedSortOption,
  setSelectedSortOption,
}: ProductSorterProps) => {
  return (
    <SelectBox
      state={selectedSortOption}
      setState={setSelectedSortOption}
      options={sortOptions}
    />
  );
};

export default ProductSorter;
