import Styled from '@emotion/styled';

export const ErrorBoxContainer = Styled.div<{
  backgroundColor: string;
  isOpen?: boolean;
}>`
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  
  &:hover {
    opacity: 0.8;
  }
`;

export const CloseButton = Styled.button`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  margin-left: 12px;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;
