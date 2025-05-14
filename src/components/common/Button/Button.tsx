import { css } from '@emotion/css';

type ButtonProps = {
  backgroundColor?: string;
  radius?: string;
  color?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonStyleProps = Omit<ButtonProps, 'children'>;

const button = ({ backgroundColor, radius, color }: ButtonStyleProps) => css`
  background-color: ${backgroundColor};
  border-radius: ${radius};
  color: ${color};
  border: none;
  cursor: pointer;
  padding: 4px 8px;
`;

function Button({
  backgroundColor = 'inherit',
  radius = '0px',
  color = '#000000',
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ backgroundColor, radius, color })} {...props}>
      {children}
    </button>
  );
}

export default Button;
