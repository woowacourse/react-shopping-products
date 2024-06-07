import styled from '@emotion/styled';
import { COLOR } from '@styles/style.constant';

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid ${COLOR.borderColor};
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  right: 0;
`;

export const NotShoppingCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0px;
`;
