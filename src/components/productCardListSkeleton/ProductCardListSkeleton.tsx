import {
  ProductContainer,
  ProductImage,
  ContentContainer,
  ProductTitle,
  ProductPrice,
  ButtonContainer,
} from "../productCard/ProductCard.css";
import { CardListContainer } from "../productCardList/ProductCardList.css";

function ProductCardSkeleton() {
  return (
    <div css={ProductContainer}>
      <div css={[ProductImage, { backgroundColor: "#eee", height: 150 }]} />
      <div css={ContentContainer}>
        <div
          css={[
            ProductTitle,
            { width: "60%", height: 20, backgroundColor: "#ddd" },
          ]}
        />
        <div
          css={[
            ProductPrice,
            { width: "40%", height: 16, backgroundColor: "#eee", marginTop: 8 },
          ]}
        />
      </div>
      <div css={ButtonContainer}>
        <div
          css={{
            width: "100%",
            height: 36,
            backgroundColor: "#ccc",
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
}

function ProductCardListSkeleton() {
  return (
    <div css={CardListContainer}>
      {Array.from({ length: 20 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default ProductCardListSkeleton;
