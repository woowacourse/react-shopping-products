import { Dispatch } from "react";
import SelectBox from "../@common/SelectBox/SelectBox";
import { SortOptionsKey, sortOptions } from "../../constants";

interface ProductSorterProps {
  selectedSortOption: SortOptionsKey;
  setSelectedSortOption: Dispatch<React.SetStateAction<SortOptionsKey>>;
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
