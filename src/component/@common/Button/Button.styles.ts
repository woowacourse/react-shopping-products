import { css } from '@emotion/react';
import { theme } from '../../../style';

const buttonDefaultStyle = css`
  display: flex;
  padding: 0.4rem 0.8rem;
  align-items: center;
  gap: 0.4rem;

  border: none;
`;

export const buttonStyle = {
  default: css`
    ${buttonDefaultStyle}

    border-radius: 4px;
    background: ${theme.color.black};

    color: ${theme.color.white};
  `,
  gray: css`
    ${buttonDefaultStyle}

    border-radius: 4px;
    background: ${theme.color.gray1};

    color: ${theme.color.black};
  `,
};
