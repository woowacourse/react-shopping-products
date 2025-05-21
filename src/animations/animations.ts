import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
    from{
        opacity: 0;
        transform: translateY(-10px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
`;

export const fadeOut = keyframes`
    from{
        opacity: 1;
        transform: translateY(0);
    }
    to{
        opacity: 0;
        transform: translateY(-10px);
    }
`;

export const shimmer = keyframes`
 0% {
    background-position: 0%;
  }

  100% {
    background-position: 300%;
  }
`;
