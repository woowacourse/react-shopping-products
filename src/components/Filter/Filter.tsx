import * as Styled from "./Filter.styled";

interface FilterProps {
  handleCategory: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Filter({ handleCategory }: FilterProps) {
  return (
    <Styled.Container>
      <Styled.Select onChange={handleCategory}>
        <option>전체</option>
        <option>식료품</option>
        <option>패션잡화</option>
      </Styled.Select>
      <Styled.Select>
        <option>낮은 가격순</option>
        <option>높은 가격순</option>
      </Styled.Select>
    </Styled.Container>
  );
}

export default Filter;
