import { CartItem } from "../../../types/cartContents";
import { Product } from "../../../types/product";
import Fallback from "../../Fallback/Fallback";
import ProductCard from "../ProductCard/ProductCard";
import * as styles from "./ProductList.style";

interface ProductListProps {
  products?: Product[];
  cartItems?: CartItem[];
}

export default function ProductList({ products, cartItems }: ProductListProps) {
  if (!products) {
    return <Fallback />;
  }
  if (products.length === 0) {
    return <Fallback message="상품이 없습니다." />;
  }
  return (
    <ul css={styles.listCss}>
      {products.map(({ id, price, name, imageUrl }) => {
        return (
          <ProductCard
            key={id}
            productId={id}
            cartItemId={
              cartItems?.find((cartItem) => cartItem.product.id === id)?.id
            }
            price={price}
            title={name}
            imageUrl={imageUrl}
            isItemInCart={Boolean(cartItems?.some((p) => p.product.id === id))}
          />
        );
      })}
    </ul>
  );
}
