import * as S from "./ProductItem.styled";
import AddProductIcon from "../Icon/AddProductIcon";
import Button from "../common/Button/Button";
import RemoveProductIcon from "../Icon/RemoveProductIcon";
import AddProductItemApi from "../../api/AddProductItemApi";
import RemoveProductItemApi from "../../api/RemoveProductItemApi";
import getCartItemList from "../../api/CartItemListApi";
import blackDefaultImage from "../../assets/blackDefaultImage.png";
import { ResponseCartItem, ResponseProduct } from "../../api/types";
import { Dispatch, SetStateAction } from "react";
import { CART_MAX_COUNT } from "../../constants/constants";

function ProductItem({
  product,
  cartItemList,
  setCartItemList,
  setErrorMessage,
}: {
  product: ResponseProduct;
  cartItemList: ResponseCartItem[];
  setCartItemList: Dispatch<SetStateAction<ResponseCartItem[]>>;
  setErrorMessage: (message: string) => void;
}) {
  function isInCart(productId: number) {
    return cartItemList.some((item) => item.product.id === productId);
  }

  function getCartItemId(productId: number) {
    const cartItem = cartItemList.find((item) => item.product.id === productId);
    return cartItem?.id;
  }

  async function handleProductItem(action: string, product: ResponseProduct) {
    try {
      if (action === "remove") {
        const cartItemId = getCartItemId(product.id);
        if (cartItemId) {
          await RemoveProductItemApi(cartItemId);
        }
      } else {
        if (cartItemList.length >= CART_MAX_COUNT) {
          setErrorMessage("장바구니에는 최대 50개의 상품만 담을 수 있습니다.");
          return;
        }
        await AddProductItemApi(product.id, 1);
      }

      const rawCartItemList = await getCartItemList();
      setCartItemList(rawCartItemList);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }
  return (
    <S.ProductItemContainer>
      <S.ProductItemImage
        src={product.imageUrl}
        alt={product.name}
        onError={(e) => {
          e.currentTarget.src = blackDefaultImage;
          e.currentTarget.onerror = null;
        }}
      />
      <S.ProductItemBottom>
        <S.ProductItemDetailBox>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.ProductItemDetailBox>
        <Button
          text={isInCart(product.id) ? "삭제" : "담기"}
          icon={
            isInCart(product.id) ? <RemoveProductIcon /> : <AddProductIcon />
          }
          variation={isInCart(product.id) ? "light" : "dark"}
          onClick={() => {
            isInCart(product.id)
              ? handleProductItem("remove", product)
              : handleProductItem("add", product);
          }}
        />
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
