import Button from "../common/Button/Button";

import { ProductProps } from "./Product.types";

import * as Styled from "./Product.styled";

import defaultImage from "/defaultImage.png";

function Product({ product }: ProductProps) {
  return (
    <Styled.Container>
      <Styled.Image src={product.imageUrl ?? defaultImage} />
      <Styled.Wrapper>
        <Styled.Contents>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </Styled.Contents>
        <Styled.ButtonWrapper>
          <Button color="light" onClick={() => {}}>
            빼기
          </Button>
        </Styled.ButtonWrapper>
      </Styled.Wrapper>
    </Styled.Container>
  );
}

export default Product;
