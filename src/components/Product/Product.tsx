import { ProductProps } from "./Product.types";

import * as Styled from "./Product.styled";

import defaultImage from "/defaultImage.png";
import AddButton from "../AddButton/AddButton";
import RemoveButton from "../RemoveButton/RemoveButton";

function Product({ product, handleAddProduct }: ProductProps) {
  return (
    <li id={product.id.toString()}>
      <Styled.Container>
        <Styled.Image src={product.imageUrl ?? defaultImage} />
        <Styled.Wrapper>
          <Styled.Contents>
            <Styled.ProductTitle>{product.name}</Styled.ProductTitle>
            <Styled.ProductPrice>
              {`${product.price.toLocaleString()}원`}
            </Styled.ProductPrice>
          </Styled.Contents>
          <Styled.ButtonWrapper>
            <AddButton handleAddProduct={handleAddProduct}></AddButton>
            <RemoveButton handleRemoveProduct={() => {}}></RemoveButton>
          </Styled.ButtonWrapper>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default Product;
