import * as S from "@/components/_common/TextBox/style";

export type TextType = "xLarge" | "large" | "medium" | "small" | "xSmall" | "semiSmall";
export type PositionType = "normal" | "center";
interface TextBoxProps {
  asset?: () => JSX.Element;
  text: string;
  type: TextType;
  style?: React.CSSProperties;
  disabled?: boolean;
  position: PositionType;
}

const TextBox = ({ asset, text, type, style, disabled = false, position = "normal" }: TextBoxProps) => {
  return (
    <S.CaptionText type={type} style={style} disabled={disabled} position={position}>
      {asset && asset()}
      {text}
    </S.CaptionText>
  );
};

export default TextBox;
