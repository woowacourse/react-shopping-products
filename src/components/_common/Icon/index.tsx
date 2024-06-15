import { IMAGES } from "@/assets/images";
import * as S from "@/components/_common/Icon/style";

export type IconKind = "addCart" | "deleteCart" | "downArrow" | "cart" | "minus" | "plus";

interface IconProps extends React.PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>> {
  kind: IconKind;
}

const Icon = ({ kind, ...props }: IconProps) => {
  return (
    <>
      <S.Img src={IMAGES[kind]} {...props} />
    </>
  );
};

export default Icon;
