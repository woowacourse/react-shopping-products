import Styled from '@emotion/styled';

export const ProductItemContainer = Styled.div`
  width:100%;
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
