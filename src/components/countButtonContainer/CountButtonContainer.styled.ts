import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

interface ButtonOpacityMapperProp {
  $isDisabled: boolean;
  opacity: Theme['opacity'];
}

const buttonColorMapper = ({ $isDisabled, opacity }: ButtonOpacityMapperProp) => {
  if ($isDisabled) {
    return {
      cursor: 'auto',
      opacity: opacity.disabled,
      '&:hover': {
        opacity: opacity.disabled,
      },
    };
  }

  return {
    cursor: 'pointer',
    opacity: 1,
    '&:hover': {
      opacity: opacity.hover,
    },
  };
};

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

export const CountButton = styled.button<{ $isDisabled: boolean }>`
  width: 1.5rem;
  height: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${(props) => props.theme.color.borderGray};
  border-radius: 0.5rem;
  padding: 0.25rem;

  background-color: ${(props) => props.theme.color.white};

  ${({ $isDisabled, theme }) => buttonColorMapper({ $isDisabled, opacity: theme.opacity })}
`;

export const CountLabel = styled.span`
  ${(props) => props.theme.typography.buttonLabel}
`;
