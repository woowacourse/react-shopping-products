import SelectDropdown from './SelectDropdown';
import { Container, Header } from '../../styles/SelectDropdown';
import { CATEGORY, SORT } from '../../constants/selectOption';
import { CategoryKey, SortKey } from '../../types/selectOptions';

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
        <SelectDropdown<CategoryKey> title={category} options={CATEGORY} onSelect={setCategory} />
        <SelectDropdown<SortKey> title={sort} options={SORT} onSelect={setSort} />
      </Container>
    </>
  );
};

export default SelectDropdownContainer;
