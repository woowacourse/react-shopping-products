import styled from "styled-components";
import { useCartActions } from "@src/hooks/useCartItemAction";
import { formatToKRW } from "@src/utils/formatToKRW";
import { ReactComponent as AddToCartIcon } from "@assets/addToCart.svg";
import { ReactComponent as DeleteFromCartIcon } from "@assets/deleteFromCart.svg";

interface ProductInfo {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductItemProps {
  productInfo: ProductInfo;
  showErrorToast: (message: string) => void;
}

const ProductItem = ({ productInfo, showErrorToast }: ProductItemProps) => {
  const { addToCart, removeFromCart, isIncludedInCart } = useCartActions();

  const handleAddToCart = async () => {
    try {
      await addToCart(productInfo.id, 1);
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast(error.message);
      }
    }
  };

  const handleDeleteFromCart = async () => {
    try {
      await removeFromCart(productInfo.id);
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast(error.message);
      }
    }
  };

  return (
    <S.Container>
      <S.ProductImage src={productInfo.imageUrl}></S.ProductImage>
      <S.ProductInfo>
        <S.ProductName>{productInfo.name}</S.ProductName>
        <S.ProductPrice>{formatToKRW(productInfo.price)}</S.ProductPrice>
      </S.ProductInfo>
      <S.ButtonWrapper>
        {isIncludedInCart(productInfo.id) ? (
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
