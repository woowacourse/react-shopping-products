import * as S from "./Text.styles";

type TextVariant = "title-1" | "title-2" | "title-3" | "body-1" | "body-2" | "body-3";

interface TextProps {
  variant: TextVariant;
  color?: string;
  children: React.ReactNode;
}

const Text = ({ variant, color = "#000", children }: TextProps) => {
  return (
    <S.Text variant={variant} color={color}>
      {children}
    </S.Text>
  );
};

export default Text;
