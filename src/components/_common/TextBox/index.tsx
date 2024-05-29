import * as S from "@/components/_common/TextBox/style";

export type TextType = "xLarge" | "large" | "medium" | "small" | "xSmall" | "semiSmall";

interface TextBoxProps {
  asset?: () => JSX.Element;
  text: string;
  type: TextType;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const TextBox = ({ asset, text, type, style, disabled = false }: TextBoxProps) => {
  return (
    <S.CaptionText type={type} style={style} disabled={disabled}>
      {asset && asset()}
      {text}
    </S.CaptionText>
  );
};

export default TextBox;
