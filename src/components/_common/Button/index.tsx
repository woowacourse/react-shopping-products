import { PropsWithChildren } from "react";
import S from "./style";

export type ButtonBorderType = "square" | "round";

export type ButtonPosition = "bottom" | "basic";

type BasicButtonProps = {
  padding?: number;
  width?: number;
  height: number;
  borderType: ButtonBorderType;
  onClick?: () => void;
  textColor?: string;
  disabled: boolean;
  backgroundColor: string;
  position: ButtonPosition;
  borderColor?: string;
  fontSize?: number;
};

const Button = ({
  children,
  width,
  height,
  disabled,
  backgroundColor,
  borderType,
  position,
  borderColor,
  fontSize,
  ...props
}: PropsWithChildren<BasicButtonProps>) => {
  return (
    <S.ButtonWrapper
      width={width}
      height={height}
      disabled={disabled}
      $backgroundColor={backgroundColor}
      $borderType={borderType}
      position={position}
      $borderColor={borderColor}
      fontSize={fontSize}
      {...props}
    >
      {children}
    </S.ButtonWrapper>
  );
};
export default Button;
