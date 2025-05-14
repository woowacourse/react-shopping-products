import { css } from "@emotion/react";
import CartButton from "./CartButton";
interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  onClick: () => void;
  isItemInCart: boolean;
  productId: number;
  cartItemId?: number;
}

function ProductCard({
  title,
  price,
  imageUrl,
  isItemInCart,
  onClick,
  productId,
  cartItemId,
}: ProductCardProps) {
  return (
    <li css={cardCss}>
      <img css={imageCss} src={imageUrl} alt={`${title}상품`} />
      <div css={detailCss}>
        <h2>{title}</h2>
        <p>{`${price.toLocaleString()}원`}</p>
        <CartButton
          productId={productId}
          onClick={onClick}
          isInCart={isItemInCart}
          cartItemId={cartItemId}
        />
      </div>
    </li>
  );
}

export default ProductCard;

const cardCss = css({
  display: "flex",
  width: "182px",
  height: "250px",
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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "20px",
  },
  p: { fontWeight: "500", fontSize: "14px", marginBottom: "1rem" },
});
