import Select from "../commons/Select";

const options = [
  { value: "전체", text: "전체" },
  { value: "식료품", text: "식료품" },
  { value: "패션잡화", text: "패션잡화" },
];

interface FilterProps {
  selectedCategory: "전체" | "패션잡화" | "식료품";
  setSelectedCategory: (category: "전체" | "패션잡화" | "식료품") => void;
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
