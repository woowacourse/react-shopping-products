import { ProductProps } from "./ProductItem.types";

import * as Styled from "./ProductItem.styled";

import defaultImage from "/defaultImage.png";
import ProductAddButton from "../ProductAddButton/ProductAddButton";
import ProductQuantityControl from "../ProductQuantityControl/ProductQuantityControl";

function ProductItem({
  product,
  isInCart,
  quantity,
  handleAddProduct,
  handleIncreaseCartItemQuantity,
  handleDecreaseCartItemQuantity,
}: ProductProps) {
  return (
    <li>
      <Styled.Container>
        <Styled.Image src={product.imageUrl || defaultImage} />
        <Styled.Wrapper>
          <Styled.Contents>
            <Styled.ProductTitle>{product.name}</Styled.ProductTitle>
            <Styled.ProductPrice>
              {`${product.price.toLocaleString()}원`}
            </Styled.ProductPrice>
          </Styled.Contents>
          <Styled.ButtonWrapper>
            {isInCart ? (
              <ProductQuantityControl
                quantity={quantity}
                handleIncreaseCartItemQuantity={() =>
                  handleIncreaseCartItemQuantity(product.id)
                }
                handleDecreaseCartItemQuantity={() =>
                  handleDecreaseCartItemQuantity(product.id)
                }
              />
            ) : (
              <ProductAddButton
                handleAddProduct={() => handleAddProduct(product.id)}
              />
            )}
          </Styled.ButtonWrapper>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default ProductItem;
