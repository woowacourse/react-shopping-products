import { CategoryType } from "../../types/index.types";
import Select from "../commons/Select";

const options = [
  { value: "전체", text: "전체" },
  { value: "식료품", text: "식료품" },
  { value: "패션잡화", text: "패션잡화" },
];

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
