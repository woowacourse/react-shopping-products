import { css } from '@emotion/react';
import { reset } from '@/styles/reset.style';
import { STYLE_THEME } from '@/styles/constants/theme';

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
    font-size: ${STYLE_THEME.fontSize.medium};
    font-weight: ${STYLE_THEME.fontWeight.medium};
    box-shadow: 0 0 20px ${STYLE_THEME.color.blackWithOpacity};
  }

  #root {
    height: 100%;
  }
`;

export default baseStyle;
