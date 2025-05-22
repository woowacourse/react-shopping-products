import styled from '@emotion/styled';

export const ProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 80px);
  box-sizing: border-box;
  padding: 36px 24px 0 24px;
  margin-top: 80px;
`;

export const ProductListHeader = styled.div`
  width: 100%;
  height: 95px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductListHeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export const ProductListFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;
export const ProductList = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 20px;
  flex: 1;
  width: 100%;
  margin-top: 28px;
  padding-bottom: 20px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
