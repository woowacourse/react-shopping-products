import styled from "styled-components";
import { ReactComponent as AddToCartIcon } from "../../assets/addToCart.svg";
import { ReactComponent as DeleteFromCartIcon } from "../../assets/deleteFromCart.svg";
import { addCartItem, deleteCartItem } from "../../api/cartItems";
import { useContext } from "react";
import { CartItemsContext } from "../../store/cartItemsContext";
import { MAX_CART_ITEM_COUNT } from "../__constants__/cartItems";

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductItem = ({ id, name, price, imageUrl }: ProductItemProps) => {
  const { cartItems, refreshCartItems } = useContext(CartItemsContext);

  // TODO: 아래의 로직을 리팩토링 (addToCart, deleteFromCart와 같은 함수를 반환하는 커스텀훅으로 분리?, alert 로직은 어떻게 하지?)
  const handleAddToCart = async () => {
    if (cartItems.length < MAX_CART_ITEM_COUNT) {
      try {
        await addCartItem(id, 1);
        await refreshCartItems();
      } catch {
        alert("상품을 장바구니에 담는 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } else {
      alert("장바구니에 담을 수 있는 상품의 개수는 20개까지입니다.");
    }
  };

  const targetCartItemId = cartItems.find((cartItem) => cartItem.product.id === id)?.id;
  const handleDeleteFromCart = async () => {
    if (targetCartItemId) {
      try {
        await deleteCartItem(targetCartItemId);
        await refreshCartItems();
      } catch {
        alert("상품을 장바구니에서 빼는 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } else {
      alert("해당 상품이 장바구니에 없습니다.");
    }
  };

  return (
    <S.Container>
      <S.ProductImage src={imageUrl}></S.ProductImage>
      <S.ProductInfo>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
      </S.ProductInfo>
      <S.ButtonWrapper>
        {targetCartItemId ? (
          <S.DeleteFromCartIcon
            role="button"
            aria-label="상품 빼기"
            onClick={handleDeleteFromCart}
          />
        ) : (
          <S.AddToCartIcon role="button" aria-label="상품 담기" onClick={handleAddToCart} />
        )}
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default ProductItem;

const S = {
  Container: styled.article`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 48%;
  `,

  ProductImage: styled.img`
    width: 100%;
    height: 11rem;
    object-fit: cover;
    border-radius: 1.2rem 1.2rem 0 0;

    // 이미지 드래그 방지
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1.5rem 0.8rem;
  `,

  ProductName: styled.h3`
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
  `,

  ProductPrice: styled.p`
    font-size: 1.2rem;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-top: 0.8rem;
    width: 100%;
    right: 0;
  `,

  AddToCartIcon: styled(AddToCartIcon)`
    cursor: pointer;
  `,

  DeleteFromCartIcon: styled(DeleteFromCartIcon)`
    cursor: pointer;
  `,
};
