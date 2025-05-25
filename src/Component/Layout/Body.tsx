import { ComponentProps, PropsWithChildren } from "react";
import { StyledBody } from "../../styles/Layout/Body.styles";

export default function Body({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) {
  return <StyledBody {...props}>{children}</StyledBody>;
}
