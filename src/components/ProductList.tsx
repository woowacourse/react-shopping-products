import ProductCard from "./ProductCard";
import { Product } from "../types/product";
import { css } from "@emotion/react";
import { CartItem } from "../types/cartContents";
import Fallback from "./Fallback";
interface ProductListProps {
  products?: Product[];
  cartItems?: CartItem[];
  handleCartButtonClick: () => void;
}

export default function ProductList({
  products,
  cartItems,
  handleCartButtonClick,
}: ProductListProps) {
  if (!products || !cartItems) {
    return (
      <div css={fallbackDivCss}>
        <Fallback />
      </div>
    );
  }

  return (
    <ul css={listCss}>
      {products.map(({ id, price, name, imageUrl }) => (
        <ProductCard
          key={id}
          price={price}
          title={name}
          imageUrl={imageUrl}
          onClick={handleCartButtonClick}
          isItemInCart={Boolean(cartItems.some((p) => p.product.id === id))}
        />
      ))}
    </ul>
  );
}

const listCss = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  width: "400px",
  placeItems: "center",
  margin: "0 auto",
  minHeight: "800px",
});

const fallbackDivCss = css({
  display: "flex",
  width: "400px",
  justifyContent: "center",
  alignItems: "center",
});
