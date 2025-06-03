import styled from '@emotion/styled';

export const Product = styled.li`
  display: flex;
  width: 100%;
  height: 112px;
  padding: 10px 0;
`;

export const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

export const Title = styled.h4`
  font-size: 16px;
  font-weight: 700;
`;

export const PriceText = styled.span`
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  flex: 1;
`;

export const ButtonContainer = styled.div``;

export const ButtonText = styled.button`
  width: 40px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: transparent;
  cursor: pointer;
`;
