import Button from "../common/Button/Button";

import { ProductProps } from "./Product.types";

import * as Styled from "./Product.styled";

import defaultImage from "/defaultImage.png";

function Product({ product }: ProductProps) {
  return (
    <li>
      <Styled.Container>
        <Styled.Image src={product.imageUrl ?? defaultImage} />
        <Styled.Wrapper>
          <Styled.Contents>
            <Styled.ProductTitle>{product.name}</Styled.ProductTitle>
            <Styled.ProductPrice>{product.price}</Styled.ProductPrice>
          </Styled.Contents>
          <Styled.ButtonWrapper>
            <Button color="light" onClick={() => {}}>
              빼기
            </Button>
          </Styled.ButtonWrapper>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default Product;
