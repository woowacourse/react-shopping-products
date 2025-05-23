import { css } from '@emotion/react';
import { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
}

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const styleMap = {
    primary: primaryStyle,
    secondary: secondaryStyle
  };

  return (
    <button css={styleMap[variant]} {...props}>
      {children}
    </button>
  );
}

const baseStyle = css`
  width: 100%;
  font-size: 15px;
  padding: 6px 20px;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  border: none;
`;

const primaryStyle = css`
  ${baseStyle};
  background-color: #333;
  color: white;
`;

const secondaryStyle = css`
  ${baseStyle};
  background-color: white;
  color: rgba(51, 51, 51, 0.75);
  border: 1px solid rgba(51, 51, 51, 0.25);
`;
