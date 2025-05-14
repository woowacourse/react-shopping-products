import { css } from "@emotion/css";
import { Product } from "../../types/product.type";
import ProductCard from "../ProductCard";

interface ProductCardListProps {
  products: Product[];
}

const ProductCardList = ({ products }: ProductCardListProps) => {
  return (
    <div className={ProductCardListStyles}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
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
