import { Dispatch } from "react";
import SelectBox from "../@common/SelectBox/SelectBox";

interface ProductSorterProps {
  sortOption: string;
  setSortOption: Dispatch<React.SetStateAction<string>>;
}

const ProductSorter = ({ sortOption, setSortOption }: ProductSorterProps) => {
  const options = ["낮은 가격 순", "높은 가격 순"];
  return (
    <SelectBox state={sortOption} setState={setSortOption} options={options} />
  );
};

export default ProductSorter;
