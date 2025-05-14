import { css } from "@emotion/react";
import Product from "../Product/Product";
import Button from "../Button/Button";

interface Product {
  id: string;
  imgSrc: string;
  productName: string;
  price: string;
}

interface ProductContainerProps {
  products: Product[];
}

const ProductContainerLayout = css`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
`;

export default function ProductContainer({ products }: ProductContainerProps) {
  const onClick = () => {
    console.log("click");
  };

  return (
    <div css={ProductContainerLayout}>
      {products.map((product) => (
        <Product
          id={product.id}
          imgSrc={product.imgSrc}
          productName={product.productName}
          price={product.price}
        >
          <Button onClick={onClick}>
            <img src="./add-shopping-cart.svg" />
            <p>담기</p>
          </Button>
        </Product>
      ))}
    </div>
  );
}
