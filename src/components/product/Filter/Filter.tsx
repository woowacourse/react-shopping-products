import * as Styled from "./Filter.styled";

interface FilterProps {
  handleCategory: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSort: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Filter({ handleCategory, handleSort }: FilterProps) {
  return (
    <Styled.Container>
      <Styled.Select onChange={handleCategory}>
        <option value="전체">전체</option>
        <option value="식료품">식료품</option>
        <option value="패션잡화">패션잡화</option>
      </Styled.Select>
      <Styled.Select onChange={handleSort}>
        <option value="price,asc">낮은 가격순</option>
        <option value="price,desc">높은 가격순</option>
      </Styled.Select>
    </Styled.Container>
  );
}

export default Filter;
