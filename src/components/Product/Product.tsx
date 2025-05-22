import { ProductProps } from "./Product.types";

import * as Styled from "./Product.styled";

import defaultImage from "/defaultImage.png";

import AddButton from "../AddButton/AddButton";
import RemoveButton from "../RemoveButton/RemoveButton";
import useCartItemsId from "../../hooks/useCartItemsId";

function Product({ product, isInCart }: ProductProps) {
  const { state, addCartItemId, removeCartItemId } = useCartItemsId();

  const handleAddProduct = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const $product = event.currentTarget.closest("li");
    $product && addCartItemId($product.id);
  };

  const handleRemoveProduct = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const $product = event.currentTarget.closest("li");
    $product && removeCartItemId($product.id);
  };

  return (
    <li id={product.id.toString()}>
      <Styled.Container>
        <Styled.Image
          src={product.imageUrl ?? defaultImage}
          onError={(e) => (e.currentTarget.src = defaultImage)}
        />
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
                handleRemoveProduct={handleRemoveProduct}
                disabled={!state.isSuccess}
              />
            ) : (
              <AddButton
                handleAddProduct={handleAddProduct}
                disabled={!state.isSuccess}
              />
            )}
          </Styled.ButtonWrapper>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default Product;
