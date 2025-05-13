import styled from "@emotion/styled";

export const Item = styled.li`
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 8px;
  border: 1px solid #eaeaea;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
`;

export const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px 8px 0 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px 8px 8px;
  gap: 20px;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProductName = styled.p`
  color: #0a0d13;
  font-size: 14px;
  font-weight: 700;
`;

export const ProductPrice = styled.p`
  color: #0a0d13;
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;
