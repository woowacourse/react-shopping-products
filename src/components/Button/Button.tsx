import { css } from '@emotion/css';

type ButtonProps = {
  backgroundColor?: string;
  radius?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonStyleProps = Omit<ButtonProps, 'children'>;

const button = ({ backgroundColor, radius }: ButtonStyleProps) => css`
  background-color: ${backgroundColor};
  border-radius: ${radius};

  border: none;
  cursor: pointer;
`;

function Button({ backgroundColor = 'inherit', radius = '0px', children }: ButtonProps) {
  return <button className={button({ backgroundColor, radius })}>{children}</button>;
}

export default Button;
