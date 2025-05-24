import { Dispatch } from "react";
import { sortOptions, SortOptionsKey } from "../../../../shared/config/filter";
import SelectBox from "../../../../shared/ui/SelectBox/SelectBox";

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
