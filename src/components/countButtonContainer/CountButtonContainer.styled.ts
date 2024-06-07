import styled from '@emotion/styled';

import { THEME } from '@/constants/theme';

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;

  border: 2px solid #3498db;
  border-top: 2px solid transparent;
  border-radius: 50%;

  animation: rotate 1s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const CountWrapper = styled.div`
  width: 5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CountButton = styled.button<{ $isDisabled?: boolean }>`
  width: 1.5rem;
  height: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${THEME.LIGHT_BLACK};
  border-radius: 0.5rem;
  padding: 0.25rem;

  background-color: ${THEME.WHITE};

  font-size: 1.5rem;

  &:hover {
    opacity: ${(props) => (props.$isDisabled ? THEME.DISABLED_OPACITY : THEME.HOVER_OPACITY)};
  }

  cursor: ${(props) => (props.$isDisabled ? 'auto' : 'pointer')};
  opacity: ${(props) => (props.$isDisabled ? THEME.DISABLED_OPACITY : 1)};
`;
