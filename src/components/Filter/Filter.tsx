import styled from "@emotion/styled";

function Filter(props) {
  return (
    <Container>
      <Select>
        <option>전체</option>
        <option>식료품</option>
        <option>패션잡화</option>
      </Select>
      <Select>
        <option>낮은 가격순</option>
        <option>높은 가격순</option>
      </Select>
    </Container>
  );
}

export default Filter;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  width: 124px;
  padding: 8px;
  border: 1px solid #c4c2c2;
  border-radius: 8px;
`;
