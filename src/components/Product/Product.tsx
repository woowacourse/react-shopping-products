import { ProductProps } from "./Product.types";

import * as Styled from "./Product.styled";

import defaultImage from "/defaultImage.png";
import AddButton from "../AddButton/AddButton";
import RemoveButton from "../RemoveButton/RemoveButton";

function Product({
  product,
  isInCart,
  handleAddProduct,
  handleRemoveProduct,
}: ProductProps) {
  return (
    <li>
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
            {isInCart ? (
              <RemoveButton
                handleRemoveProduct={() =>
                  handleRemoveProduct(product.id.toString())
                }
              />
            ) : (
              <AddButton
                handleAddProduct={() => handleAddProduct(product.id.toString())}
              />
            )}
          </Styled.ButtonWrapper>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default Product;
