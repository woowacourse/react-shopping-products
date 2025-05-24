import styled from "@emotion/styled";

export const QuantityControllerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f4f4f4;
    border-color: #999;
  }

  img {
    width: 15px;
    height: 15px;
  }
`;

export const Count = styled.p`
  font-size: 15px;
  font-weight: 500;
  min-width: 16px;
  text-align: center;
`;
