import * as S from "./ProductItem.styled";
import AddProductIcon from "../Icon/AddProductIcon";
import { ResponseCartItem, ResponseProduct } from "../../api/types";
import Button from "../common/Button/Button";
import RemoveProductIcon from "../Icon/RemoveProductIcon";
import AddProductItemApi from "../../api/AddProductItemApi";
import RemoveProductItemApi from "../../api/RemoveProductItemApi";

function ProductItem({
  product,
  cartItemList,
  setErrorMessage,
}: {
  product: ResponseProduct;
  cartItemList: ResponseCartItem[];
  setErrorMessage: (message: string) => void;
}) {
  function getCartItemId(productId: number) {
    const cartItem = cartItemList.find((item) => item.product.id === productId);
    return cartItem?.id;
  }

  function handleProductItem(product: ResponseProduct) {
    try {
      if (product.isInCart) {
        const cartItemId = getCartItemId(product.id);
        if (cartItemId) {
          RemoveProductItemApi(cartItemId);
        }
      } else {
        AddProductItemApi(product.id, 1);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setErrorMessage("");
    }
  }
  return (
    <S.ProductItemContainer>
      <S.ProductItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductItemBottom>
        <S.ProductItemDetailBox>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.ProductItemDetailBox>
        <Button
          text={product.isInCart ? "삭제" : "담기"}
          icon={product.isInCart ? <RemoveProductIcon /> : <AddProductIcon />}
          keyWord={product.isInCart ? "remove" : "add"}
          onClick={() => {
            handleProductItem(product);
          }}
        />
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
