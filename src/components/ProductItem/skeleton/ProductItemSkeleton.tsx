import * as Styled from "./ProductItemSkeleton.style";

export default function ProductItemSkeleton() {
  return (
    <Styled.ProductItemBoxSkeleton>
      <Styled.ProductImageSkeleton />
      <Styled.ProductContentBoxSkeleton>
        <Styled.ProductDescriptionBoxSkeleton>
          <h2>&nbsp;</h2>
          <h2>&nbsp;</h2>
        </Styled.ProductDescriptionBoxSkeleton>
        <Styled.ProductFooterSkeleton>
          <Styled.ProductCartButtonSkeleton />
        </Styled.ProductFooterSkeleton>
      </Styled.ProductContentBoxSkeleton>
    </Styled.ProductItemBoxSkeleton>
  );
}
