import SelectDropdown from "./SelectDropdown";
import { Container, Header } from "./SelectDropdown.styled";
import {
  CATEGORY,
  SORT,
  CategoryKey,
  SortKey,
} from "../../constants/selectOption";

type SelectDropdownContainerProps = {
  category: CategoryKey;
  sort: SortKey;
  setCategory: React.Dispatch<React.SetStateAction<CategoryKey>>;
  setSort: React.Dispatch<React.SetStateAction<SortKey>>;
};

const SelectDropdownContainer = ({
  category,
  sort,
  setCategory,
  setSort,
}: SelectDropdownContainerProps) => {
  return (
    <>
      <Header>bpple 상품 목록</Header>
      <Container>
        <SelectDropdown
          title={CATEGORY[category]}
          options={Object.keys(CATEGORY) as CategoryKey[]}
          labelMap={CATEGORY}
          onSelect={(value) => setCategory(value)}
        />
        <SelectDropdown
          title={SORT[sort]}
          options={Object.keys(SORT) as SortKey[]}
          labelMap={SORT}
          onSelect={(value) => setSort(value)}
        />
      </Container>
    </>
  );
};

export default SelectDropdownContainer;
