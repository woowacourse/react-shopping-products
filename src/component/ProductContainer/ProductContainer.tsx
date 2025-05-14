import { css } from "@emotion/react";
import Product from "../Product/Product";
import { Dispatch, SetStateAction } from "react";

export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
}

interface ProductContainerProps {
  products: Product[];
  selectedProducts: string[];
  setSelectedProducts: Dispatch<SetStateAction<string[]>>;
}

const ProductContainerLayout = css`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
`;

export default function ProductContainer({
  products,
  selectedProducts,
  setSelectedProducts,
}: ProductContainerProps) {
  return (
    <div css={ProductContainerLayout}>
      {products.map((product) => (
        <Product
          id={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      ))}
    </div>
  );
}
