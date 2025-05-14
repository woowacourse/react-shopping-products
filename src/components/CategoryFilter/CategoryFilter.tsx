import { Dispatch } from "react";
import SelectBox from "../@common/SelectBox/SelectBox";

interface CategoryFilterProps {
  category: string;
  setCategory: Dispatch<React.SetStateAction<string>>;
}

const CategoryFilter = ({ category, setCategory }: CategoryFilterProps) => {
  const options = ["전체", "식료품", "패션잡화"];
  return (
    <SelectBox state={category} setState={setCategory} options={options} />
  );
};

export default CategoryFilter;
