import { Dispatch } from "react";
import SelectBox from "../@common/SelectBox/SelectBox";
import { SortOptionsKey, sortOptions } from "../../constants";

interface Props {
  selectedSortOption: SortOptionsKey;
  setSelectedSortOption: Dispatch<React.SetStateAction<SortOptionsKey>>;
}

const ProductSorter = ({
  selectedSortOption,
  setSelectedSortOption,
}: Props) => {
  return (
    <SelectBox
      value={selectedSortOption}
      onChange={setSelectedSortOption}
      options={sortOptions}
    />
  );
};

export default ProductSorter;
