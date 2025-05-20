import { textStyle } from './Text.styles';

interface TextProps {
  children: React.ReactNode;
  variant: 'title' | 'productName' | 'body' | 'description';
}

const Text = ({ children, variant }: TextProps) => {
  return <p css={textStyle[variant]}>{children}</p>;
};

export default Text;
