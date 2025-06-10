import { CSSProperties } from "react";
import Skeleton from "../../../shared/ui/Skeleton/Skeleton";
import * as S from "./ProductItemSkeleton.styles";

const IMAGE_STYLE: CSSProperties = { height: "50%" };
const NAME_STYLE: CSSProperties = {
  width: "50%",
  height: "14px",
  marginBottom: "6px",
};
const PRICE_STYLE: CSSProperties = { width: "30%", height: "12px" };
const BUTTON_STYLE: CSSProperties = {
  width: "60px",
  height: "24px",
  position: "absolute",
  right: "8px",
  bottom: "8px",
};

const ProductItemSkeleton = () => {
  return (
    <S.SkeletonContainer>
      <Skeleton style={IMAGE_STYLE} />
      <S.SkeletonWrapper>
        <Skeleton style={NAME_STYLE} />
        <Skeleton style={PRICE_STYLE} />
        <Skeleton style={BUTTON_STYLE} />
      </S.SkeletonWrapper>
    </S.SkeletonContainer>
  );
};

export default ProductItemSkeleton;
