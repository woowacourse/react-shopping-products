import styled from 'styled-components';

export const ErrorMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;

  padding: 1.2rem 1rem;
  position: absolute;
  top: 6.4rem;
  left: 0;
  width: 100%;

  background-color: var(--error-color);
  color: var(--black-color-2);

  font-size: 1.2rem;
  line-height: 1.5rem;
`;
