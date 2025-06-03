import styled from '@emotion/styled';

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const StepperButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  font-size: 18px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
  }

  &:active {
    background-color: #e8e8e8;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    &:hover {
      background-color: white;
      border-color: #ddd;
    }
  }
`;

export const StepperQuantity = styled.span`
  min-width: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  user-select: none;
`;
