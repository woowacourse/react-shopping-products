import * as P from "./ProductListPage.styles";
import styled from "@emotion/styled";
import { PRODUCT_LIST_ITEM_COUNT } from "../../constants/systemConstants";
import { css } from "@emotion/react";
import { shimmer } from "../../animations/animations";

const ProductListPageSkeleton = () => {
	return (
		<SkeletonContainer $isDimmed={false} data-testid="product-list-skeleton">
			<SkeletonTitle />
			<P.SelectContainer>
				<SkeletonSelect />
				<SkeletonSelect />
			</P.SelectContainer>

			<P.ProductItemContainer>
				{Array.from({ length: PRODUCT_LIST_ITEM_COUNT }, (_, index) => (
					//biome-ignore lint/suspicious/noArrayIndexKey: Skeleton UI는 고정된 구조를 렌더링하기 때문에 key로 index 사용이 안전
					<SkeletonProductItem key={index} />
				))}
			</P.ProductItemContainer>
		</SkeletonContainer>
	);
};

const skeletonShimmerStyle = css`
  background: linear-gradient(
    140deg,
    var(--color-grey) 40%,
    var(--color-light-grey) 50%,
    var(--color-grey) 60%
  );
  background-size: 300%;
  animation: ${shimmer} 3s infinite linear;
`;

const SkeletonContainer = styled(P.ProductListPageContainer)``;

const SkeletonTitle = styled(P.Title)`
  background-color: var(--color-grey);
  height: 20px;
  ${skeletonShimmerStyle}
`;

const SkeletonSelect = styled.div`
  width: 100%;
  max-width: 125px;
  height: 25px;
  background-color: var(--color-grey);
  ${skeletonShimmerStyle}
`;

const SkeletonProductItem = styled.div`
  max-width: 182px;
  height: 220px;
  width: 100%;
  background-color: var(--color-grey);
  ${skeletonShimmerStyle}
`;

export default ProductListPageSkeleton;
