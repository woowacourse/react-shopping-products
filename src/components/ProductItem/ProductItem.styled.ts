import Styled from '@emotion/styled';

export const ProductItemContainer = Styled.div`
  width:182px;
  height:224px;
  border-radius:8px;
  overflow:hidden;
`;

export const ProductItemImage = Styled.img`
  height:112px;
  width:100%;
  object-fit:cover;
`;

export const ProductItemBottom = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 15px 8px 8px;
  gap: 27px;;
`;

export const ProductItemDetailBox = Styled.div`
  display: flex;
  flex-direction: column;
  gap:8px;
  width:100%;
`;

export const ProductName = Styled.p`
  font-size:14px;
  font-weight:700;
`;

export const ProductPrice = Styled.p`
  font-size:12px;
`;

export const ProductButton = Styled.button`
  width:59px;
  height:24px;
  border-radius:4px;
  font-size:12px;
  font-weight:600;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
