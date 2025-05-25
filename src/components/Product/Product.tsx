import Button from "../common/Button/Button";

import AddButton from "../AddButton/AddButton";

import useCartItemsId from "../../hooks/useCartItemsId";

import { ProductProps } from "./Product.types";

import * as Styled from "./Product.styled";

import defaultImage from "/defaultImage.png";

function Product({ product, isInCart }: ProductProps) {
  const { state, cartItemsId, addCartItemId } = useCartItemsId();

  const cartItemId = cartItemsId.find(
    (item) => item.productId === product.id.toString()
  );

  const handleIncreaseProductQuantity = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const $product = event.currentTarget.closest("li");
    $product &&
      addCartItemId($product.id, cartItemId ? cartItemId.cartQuantity + 1 : 1);
  };

  const handleDecreaseProductQuantity = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const $product = event.currentTarget.closest("li");
    $product &&
      addCartItemId($product.id, cartItemId ? cartItemId.cartQuantity - 1 : 0);
  };

  return (
    <li id={product.id.toString()}>
      <Styled.Container>
        {product.quantity === 0 && <Styled.SoldOut> 품절</Styled.SoldOut>}
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
            {isInCart && (
              <>
                <Button color="light" onClick={handleDecreaseProductQuantity}>
                  -
                </Button>
                <p>{cartItemId ? cartItemId.cartQuantity : 0}</p>
                <Button color="light" onClick={handleIncreaseProductQuantity}>
                  +
                </Button>
              </>
            )}
            {!isInCart && (
              <AddButton
                handleAddProduct={handleIncreaseProductQuantity}
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
