import { ComponentProps, PropsWithChildren } from "react";
import * as S from "../../styles/Layout/Body.styles";

export default function Body({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) {
  return <S.Body {...props}>{children}</S.Body>;
}
