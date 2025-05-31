import styled from "@emotion/styled";

export const ProductContainer = styled.div`
  display: flex;
  width: 182px;
  height: 224px;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  user-select: none;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 8px 8px;
  border-radius: 0 0 8px 8px;
  width: 166px;

  height: 50%;
  position: relative;
  border: 1px solid #0000001a;
  border-top: none;
`;

export const ProductName = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #0a0d13;
  margin-bottom: 6px;
`;

export const ProductPrice = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;
