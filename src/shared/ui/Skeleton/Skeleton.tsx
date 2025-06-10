import { ComponentProps } from "react";
import * as S from "./Skeleton.styles";

interface Props extends ComponentProps<"div"> {}

const Skeleton = ({ ...props }: Props) => {
  return <S.Skeleton {...props} />;
};

export default Skeleton;
