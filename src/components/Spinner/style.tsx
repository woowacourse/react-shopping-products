import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
  height: 1rem;
  width: 1rem;
  border: 1.5px solid ${(props) => props.theme.color.pink};
  border-radius: 50%;
  border-top: none;
  border-right: none;

  animation: ${rotation} 1s linear infinite;
`;
