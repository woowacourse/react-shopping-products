import { css } from "@emotion/css";
import { CartItem, Product } from "../../types/product.type";
import ProductCard from "../ProductCard";

interface ProductCardListProps {
  products: Product[];
  cartItems: CartItem[];
}

const ProductCardList = ({ products, cartItems }: ProductCardListProps) => {
  return (
    <div className={ProductCardListStyles}>
      {products.map((product) => {
        const isInCart = cartItems.some(
          (item) => item.product.id === product.id
        );

        return (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={isInCart}
            cartItems={cartItems}
          />
        );
      })}
    </div>
  );
};

export default ProductCardList;

const ProductCardListStyles = css`
  padding: 0 24px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 20px;
`;
