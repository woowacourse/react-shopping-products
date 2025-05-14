import { css } from "@emotion/css";
import { Product } from "../../types/product.type";
import ProductCard from "../ProductCard";
import { useShoppingCartContext } from "../../contexts/useShoppingCartContext";

interface ProductCardListProps {
  products: Product[];
}

const ProductCardList = ({ products }: ProductCardListProps) => {
  const { cartItems } = useShoppingCartContext();

  return (
    <div className={ProductCardListStyles}>
      {products.map((product) => {
        const isInCart = cartItems.some(
          (item) => item.product.id === product.id
        );
        const cartItemId = cartItems.find(
          (item) => item.product.id === product.id
        )?.id;
        return (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={isInCart}
            cartItemId={cartItemId}
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
