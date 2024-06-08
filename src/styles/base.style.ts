import { css } from '@emotion/react';
import { reset } from '@/styles/reset.style';
import theme from '@/styles/theme.style';

const baseStyle = css`
  ${reset};

  html,
  body {
    margin: 0 auto;
    font-size: 62.5%;
  }

  body {
    max-width: 430px;
    height: 100vh;
    margin: auto;
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.medium};
    box-shadow: 0 0 20px ${theme.color.blackWithOpacity};
  }

  #root {
    height: 100%;
  }
`;

export default baseStyle;
