import * as S from "./ProductItemSkeleton.styles";
import Skeleton from "../../../@common/Skeleton/Skeleton";

const ProductItemSkeleton = () => {
  return (
    <S.SkeletonContainer>
      <Skeleton style={{ height: "50%" }} />
      <S.SkeletonWrapper>
        <Skeleton
          style={{ width: "50%", height: "14px", marginBottom: "6px" }}
        />
        <Skeleton style={{ width: "30%", height: "12px" }} />
        <Skeleton
          style={{
            width: "60px",
            height: "24px",
            position: "absolute",
            right: "8px",
            bottom: "8px",
          }}
        />
      </S.SkeletonWrapper>
    </S.SkeletonContainer>
  );
};

export default ProductItemSkeleton;
