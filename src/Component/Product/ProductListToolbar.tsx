import styled from '@emotion/styled';
import SelectBox from '../Common/SelectBox';

export default function ProductListToolbar() {
  const CATEGORY = [
    { name: '전체', value: 'all' },
    { name: '식료품', value: 'grocery' },
    { name: '패션잡화', value: 'fashion' },
  ];
  const PRICE = [
    { name: '낮은 가격순', value: 'low' },
    { name: '높은 가격순', value: 'high' },
  ];
  return (
    <Container>
      <Title>bpple 상품 목록</Title>
      <SelectBoxContainer>
        <SelectBox category={CATEGORY} name="catetory" />
        <SelectBox category={PRICE} name="price" />
      </SelectBoxContainer>
    </Container>
  );
}

const SelectBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  margin: 0px;
`;
