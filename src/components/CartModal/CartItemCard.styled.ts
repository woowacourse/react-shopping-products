import styled from 'styled-components';

export const ItemWrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
`;

export const DetailWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  row-gap: 8px;
  justify-content: space-between;
`;

export const upperDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NamePriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
export const ProductName = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 23.17px;
`;

export const ProductPrice = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;
