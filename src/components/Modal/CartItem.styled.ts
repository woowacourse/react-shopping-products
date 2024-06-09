import styled from "styled-components";

export const Container = styled.div`
  padding: 12px 0 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
`;

export const ButtonText = styled.span`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #ffffff;
  padding: 5px 9px;
  font-weight: 500;
  font-size: 12px;
  color: rgba(10, 13, 19, 1);

  position: absolute;
  right: 0;
  top: 12px;
`;

export const Img = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ProductItemBundle = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const ProductItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductItemName = styled.span`
  margin-bottom: 4px;
  color: rgba(10, 13, 19, 1);
  font-size: 16px;
  font-weight: 700;
`;

export const ProductItemPrice = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

export const ProductItemAmountGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 19px;
`;

export const ProductCount = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;
