import styled from "@emotion/styled";

export const Item = styled.li`
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 8px;
  border: 1px solid #eaeaea;
`;

export const ImageWrapper = styled.div<{ isSoldOut: boolean }>`
  width: 100%;
  aspect-ratio: 1/1;
  border-bottom: 1px solid #acacac;
  max-height: 218px;
  position: relative;
`;

export const SoldOutText = styled.p`
  position: absolute;
  color: #ffffff;
  font-size: 35px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 3.5px;
`;

export const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px 8px 0 0;
  max-height: 218px;
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
