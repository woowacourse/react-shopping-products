import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Button = styled.button`
  width: 24px;
  height: 24px;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Icon = styled.img`
  width: 12px;
`;

export const Quantity = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
