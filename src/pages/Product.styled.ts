import styled from 'styled-components';

export const ProductContentWrapper = styled.div`
  padding: 3.6rem 2.4rem;
  width: 100%;
  box-sizing: border-box;
`;

export const ProductTitle = styled.p`
  font-family: Noto Sans KR;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.475rem;

  margin-bottom: 2.4rem;
`;

export const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1.6rem;
`;

export const ObserverContainer = styled.div`
  width: 100%;
  height: 1rem;
`;
