import styled from "@emotion/styled";

export const QuantitySelector = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  width: 80px;
  height: 24px;
  line-height: 26px;
`;

export const ButtonIcon = styled.img`
  border: 1px solid #0000001a;
  border-radius: 8px;
  padding: 4px;
  width: 14px;
  height: 14px;
  cursor: pointer;

  user-select: none;
  -webkit-user-drag: none;

  &:active {
    border-color: rgb(230, 230, 230);
    background-color: #f0f0f0;
    transform: scale(0.95);
  }
`;
