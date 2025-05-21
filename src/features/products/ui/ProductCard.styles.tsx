import styled from '@emotion/styled';

export const ProductCardContainer = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

export const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  z-index: 1;
  pointer-events: none;
`;

export const ImageSection = styled.img`
  width: 100%;
  height: 180px;
  display: block;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

export const ContentSection = styled.div`
  flex: 1;
  padding: 15px 10px;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;

export const ProductCategory = styled.div`
  padding-top: 8px;
  font-size: 14px;
`;

export const ProductPrice = styled.p`
  margin-top: 12px;
  font-size: 14px;
`;

export const ProductQuantity = styled.p`
  margin-top: 12px;
  font-size: 14px;
`;

export const ButtonSection = styled.div`
  height: 30px;
  display: flex;
  justify-content: end;
  padding: 10px;
`;
