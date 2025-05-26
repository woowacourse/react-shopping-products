import Styled from '@emotion/styled';

export const StyledItem = Styled.li`
  position:relative;
  border-bottom:1px solid #ccc;
  display:flex;
  padding:16px 0;
  gap:16px;
`;

export const StyledItemInfo = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export const StyledItemInfoTitle = Styled.b`
  font-size: 20px;
  font-weight: 700;
`;

export const DeleteButton = Styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
`;
