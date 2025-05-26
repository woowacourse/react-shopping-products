/** @jsxImportSource @emotion/react */
import { textStyle } from './Text.styles';

interface TextProps {
  children: React.ReactNode;
  variant: 'title' | 'productName' | 'body' | 'description';
  className?: string;
}

const Text = ({ children, variant, className }: TextProps) => {
  return (
    <p css={textStyle[variant]} className={className}>
      {children}
    </p>
  );
};

export default Text;
