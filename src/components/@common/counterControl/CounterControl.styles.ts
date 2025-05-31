import styled from '@emotion/styled';

export const CountButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const CounterButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-light-grey);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-light-grey);
    color: var(--color-white);
  }
`;

export const CountNumber = styled.span`
  font-size: var(--font-size-body);
`;
