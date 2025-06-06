import Button from "../common/Button/Button";
import AddButton from "../AddButton/AddButton";

import useCartItemsId from "../../hooks/useCartItemsId";

import { ProductProps } from "./Product.types";

import * as Styled from "./Product.styled";

import defaultImage from "/defaultImage.png";

function Product({ product }: ProductProps) {
  const { state, cartItemsId, addCartItemId, patchCartItemId } =
    useCartItemsId();

  const cartItem = cartItemsId.find(
    (item) => Number(item.product.id) === Number(product.id)
  );

  const isInCart = Boolean(cartItem);

  const handleAddProduct = async () => {
    await addCartItemId(product.id.toString(), 1);
  };

  const handleIncreaseProductQuantity = async () => {
    if (!cartItem) return;
    await patchCartItemId(cartItem.id.toString(), cartItem.quantity + 1);
  };

  const handleDecreaseProductQuantity = async () => {
    if (!cartItem) return;
    const nextQuantity = cartItem.quantity - 1;
    await patchCartItemId(cartItem.id.toString(), Math.max(0, nextQuantity));
  };

  return (
    <li id={product.id.toString()}>
      <Styled.Container>
        {product.quantity === 0 && <Styled.SoldOut>품절</Styled.SoldOut>}
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
            {isInCart && cartItem ? (
              <>
                <Button color="light" onClick={handleDecreaseProductQuantity}>
                  -
                </Button>
                <p>{cartItem.quantity}</p>
                <Button color="light" onClick={handleIncreaseProductQuantity}>
                  +
                </Button>
              </>
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
