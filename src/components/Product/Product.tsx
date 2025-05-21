import { ProductProps } from "./Product.types";

import * as Styled from "./Product.styled";

import defaultImage from "/defaultImage.png";
import ProductAddButton from "../ProductAddButton/ProductAddButton";
import ProductRemoveButton from "../ProductRemoveButton/ProductRemoveButton";

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
              <ProductRemoveButton
                handleRemoveProduct={() =>
                  handleRemoveProduct(product.id.toString())
                }
              />
            ) : (
              <ProductAddButton
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
