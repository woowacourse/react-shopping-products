import styled from '@emotion/styled';

export const ProductCardBox = styled.div`
  width: 11.375rem;
  height: 14rem;
`;

export const ProductCardImgBox = styled.div`
  width: 100%;
  height: 112px;
  overflow: hidden;
`;

export const ProductCardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;
export const ProductCardName = styled.p`
  ${(props) => props.theme.typography.itemName}
`;

export const ProductCardPrice = styled.p`
  ${(props) => props.theme.typography.price}
`;

export const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProductCardBody = styled.div`
  padding: 0rem 0.5rem;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductButtonPosition = styled.div`
  display: flex;
  justify-content: flex-end;
`;
