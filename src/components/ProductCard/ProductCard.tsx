import { css } from "@emotion/react";

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
}

const cardCss = css({
  display: "flex",
  width: "182px",
  height: "224px",
  flexDirection: "column",
  borderRadius: "8px 8px 0 0",
  backgroundColor: "white",
});

const imageCss = css({
  objectFit: "cover",
  borderRadius: "8px 8px 0 0 ",
  height: "50%",
});

const detailCss = css({
  padding: "15px 8px 0 8px",
  h2: {
    fontWeight: "700",
    fontSize: "20px",
  },
  p: { fontWeight: "500", fontSize: "14px" },
});

function ProductCard({ title, price, imageUrl }: ProductCardProps) {
  return (
    <div css={cardCss}>
      <img css={imageCss} src={imageUrl} alt={`${title}상품`} />
      <div css={detailCss}>
        <h2>{title}</h2>
        <p>{`${price.toLocaleString()}원`}</p>
        {/* <button>Add to Cart</button> */}
      </div>
    </div>
  );
}

export default ProductCard;
