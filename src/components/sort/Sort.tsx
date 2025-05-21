import { SortType } from "../../types/index.types";
import Select from "../commons/Select";

const options = [
  { value: "낮은 가격순", text: "낮은 가격순" },
  { value: "높은 가격순", text: "높은 가격순" },
];

interface SortProps {
  selectedSort: SortType;
  setSelectedSort: (sort: SortType) => void;
}

function Sort({ selectedSort, setSelectedSort }: SortProps) {
  return (
    <Select value={selectedSort} onChange={setSelectedSort} options={options} />
  );
}

export default Sort;
