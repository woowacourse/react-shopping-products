import styled from '@emotion/styled';

export const ToastMessage = styled.div`
  position: absolute;

  width: 26.875rem;
  padding: 0.3125rem 3.125rem;
  border-radius: 0 0 8px 8px;

  background: ${(props) => props.theme.color.red};

  text-align: center;
  ${(props) => props.theme.typography.toast};
  color: ${(props) => props.theme.color.white};
`;
