import { CategoryType } from "../../types/index.types";
import Select from "../commons/Select";

const categories: CategoryType[] = ["전체", "식료품", "패션잡화"];
const options = categories.map((category) => ({
  value: category,
  text: category,
}));

interface FilterProps {
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
}

function Filter({ selectedCategory, setSelectedCategory }: FilterProps) {
  return (
    <Select
      value={selectedCategory}
      onChange={setSelectedCategory}
      options={options}
    />
  );
}

export default Filter;
