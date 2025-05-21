import styled from '@emotion/styled';

export const ProductCardContainer = styled.div`
  width: 100%;
  height: 225px;
  display: flex;
  flex-direction: column;
`;

export const ImageSection = styled.img`
  height: 112px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

export const ContentSection = styled.div`
  flex: 1;
  padding-top: 15px;
`;

export const ProductName = styled.h3`
  font-size: 14px;
  font-weight: 700;
`;

export const ProductCategory = styled.div`
  padding-top: 8px;
  font-size: 12px;
`;

export const ProductPrice = styled.p`
  margin-top: 12px;
  font-size: 12px;
`;

export const ButtonSection = styled.div<{isCarting: boolean}>`
  height: 25px;
  display: flex;
  justify-content: ${({isCarting}) => (isCarting ? 'space-between' : 'end')};
`;
