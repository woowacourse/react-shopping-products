import styled from '@emotion/styled';

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 26px;
  margin: 0 auto;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
`;

export const ProductContainer = styled.ul`
  margin: 10px 0;
  max-height: 400px;
  overflow-y: auto;
  padding: 0 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const TotalPriceText = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const TotalPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

export const ModalAction = styled.div`
  width: 100%;
  text-align: end;
`;

export const Button = styled.button`
  width: 100%;
  height: 44px;
  color: #fff;
  border-radius: 5px;
  background: #333;
  cursor: pointer;
`;
