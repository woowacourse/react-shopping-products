import { css } from "@emotion/react";
import Product from "../Product/Product";
import { Dispatch, SetStateAction } from "react";

interface Product {
  id: string;
  imgSrc: string;
  productName: string;
  price: string;
}

interface ProductContainerProps {
  products: Product[];
  setSelectedProducts: Dispatch<SetStateAction<string[]>>;
}

const ProductContainerLayout = css`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
`;

export default function ProductContainer({
  products,
  setSelectedProducts,
}: ProductContainerProps) {
  return (
    <div css={ProductContainerLayout}>
      {products.map((product) => (
        <Product
          id={product.id}
          imgSrc={product.imgSrc}
          productName={product.productName}
          price={product.price}
          setSelectedProducts={setSelectedProducts}
        />
      ))}
    </div>
  );
}
