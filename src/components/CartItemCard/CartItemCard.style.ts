import styled from 'styled-components';

export const CartItem = styled.li`
  list-style: none;

  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 100%;
`;

export const ItemBody = styled.div`
  width: 100%;
  display: flex;
  column-gap: 20px;
`;

export const ImageWraper = styled.div`
  border-radius: 8px;
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;

  gap: 8px;
`;

export const ItemNameAndCost = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 4px;
`;

export const ButtonText = styled.p`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;

export const ItemName = styled.p`
  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 700;
  line-height: 23.17px;
  text-align: left;
`;

export const ItemPrice = styled.p`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
