import { css } from '@emotion/react';
import { theme } from '../../../style';

export const cartContent = css`
  max-height: 80vh;
  overflow-y: auto;
  padding: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export const cartHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.color.gray1};

  h2 {
    margin: 0;
    ${theme.font.title};
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.6rem;
    color: ${theme.color.black};
  }
`;

export const cartItemStyle = css`
  display: flex;
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.color.gray1};

  img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-right: 1.5rem;
  }

  div {
    flex: 1;

    h3 {
      margin: 0 0 0.5rem 0;
      ${theme.font.productName};
    }

    p {
      margin: 0.5rem 0;
      ${theme.font.body};
    }
  }

  button {
    align-self: center;
    background: none;
    border: none;
    color: #ff6b6b;
    cursor: pointer;
    ${theme.font.body};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const emptyCartStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
  ${theme.font.body};
`;

export const totalPriceStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-top: 1px solid ${theme.color.gray1};

  p {
    ${theme.font.title};
    margin: 0;
  }

  button {
    padding: 1rem 2rem;
    background-color: ${theme.color.black};
    color: ${theme.color.white};
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    ${theme.font.body};
  }
`;
