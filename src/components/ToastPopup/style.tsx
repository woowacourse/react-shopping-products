import styled from '@emotion/styled';

export const ToastMessage = styled.div<{ $isOpen: boolean }>`
  position: absolute;

  width: 430px;
  padding: 10px 50px;
  border-radius: 0 0 4px 4px;

  background: ${(props) => props.theme.color.red};

  text-align: center;
  color: ${(props) => props.theme.color.white};
`;
