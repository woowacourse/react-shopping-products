import { ComponentProps } from "react";
import * as S from "./Skeleton.styles";

interface SkeletonProps extends ComponentProps<"div"> {}

const Skeleton = ({ ...props }: SkeletonProps) => {
  return <S.Skeleton {...props} />;
};

export default Skeleton;
