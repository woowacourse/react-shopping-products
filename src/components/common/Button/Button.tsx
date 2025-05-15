import { button } from './Button.style';

type ButtonProps = {
  backgroundColor?: string;
  radius?: string;
  color?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonStyleProps = Omit<ButtonProps, 'children'>;

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
