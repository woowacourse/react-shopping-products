import { css } from "@emotion/react";
import Product from "../Product/Product";
import Button from "../Button/Button";

interface Product {
  id: string;
  imgSrc: string;
  productName: string;
  price: string;
}

const ProductContainerLayout = css`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
`;

interface ProductContainerProps {
  products?: Product[];
}

export default function ProductContainer({ products }: ProductContainerProps) {
  const onClick = () => {
    console.log("click");
  };

  return (
    <div css={ProductContainerLayout}>
      <Product
        imgSrc="./default-img.png"
        productName="상품이름"
        price="30000원"
      >
        <Button onClick={onClick}>
          <img src="./add-shopping-cart.svg" />
          <p>담기</p>
        </Button>
      </Product>
      <Product
        imgSrc="./default-img.png"
        productName="상품이름"
        price="30000원"
      >
        <Button onClick={onClick}>
          <img src="./add-shopping-cart.svg" />
          <p>담기</p>
        </Button>
      </Product>

      <Product
        imgSrc="./default-img.png"
        productName="상품이름"
        price="30000원"
      >
        <Button onClick={onClick}>
          <img src="./add-shopping-cart.svg" />
          <p>담기</p>
        </Button>
      </Product>
      <Product
        imgSrc="./default-img.png"
        productName="상품이름"
        price="30000원"
      >
        <Button onClick={onClick}>
          <img src="./add-shopping-cart.svg" />
          <p>담기</p>
        </Button>
      </Product>
      <Product
        imgSrc="./default-img.png"
        productName="상품이름"
        price="30000원"
      >
        <Button onClick={onClick}>
          <img src="./add-shopping-cart.svg" />
          <p>담기</p>
        </Button>
      </Product>
    </div>
  );
}
