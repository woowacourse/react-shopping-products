import { css } from '@emotion/react';
import { theme } from '../../../style';

const buttonDefaultStyle = css`
  display: flex;
  padding: 0.4rem 0.8rem;
  align-items: center;
  gap: 0.4rem;

  border: none;

  cursor: pointer;
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
  gray3: css`
    ${buttonDefaultStyle}

    border-radius: 4px;
    background: ${theme.color.gray3};

    color: ${theme.color.white};
  `,

  white: css`
    ${buttonDefaultStyle}

    border-radius: 4px;
    background: ${theme.color.white};
    border: 1px solid ${theme.color.gray1};

    color: ${theme.color.black};
  `,
};
