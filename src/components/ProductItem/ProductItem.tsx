import * as S from "./ProductItem.styled";
import AddProductIcon from "../Icon/AddProductIcon";
import Button from "../common/Button/Button";
import RemoveProductIcon from "../Icon/RemoveProductIcon";
import blackDefaultImage from "../../assets/blackDefaultImage.png";
import { ResponseCartItem, ResponseProduct } from "../../api/types";

function ProductItem({
  product,
  cartItemList,
  onAddToCart,
  onRemoveFromCart,
  setErrorMessage,
}: {
  product: ResponseProduct;
  cartItemList: ResponseCartItem[];
  onAddToCart: (productId: number) => Promise<void>;
  onRemoveFromCart: (cartItemId: number) => Promise<void>;
  setErrorMessage: (message: string) => void;
}) {
  function isInCart(productId: number) {
    return cartItemList.some((item) => item.product.id === productId);
  }

  function getCartItemId(productId: number) {
    const cartItem = cartItemList.find((item) => item.product.id === productId);
    return cartItem?.id;
  }

  async function handleProductItem(action: string) {
    try {
      if (action === "remove") {
        const cartItemId = getCartItemId(product.id);
        if (cartItemId) {
          await onRemoveFromCart(cartItemId);
        }
      } else {
        await onAddToCart(product.id);
      }
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
        {isInCart(product.id) ? (
          <Button
            text="삭제"
            icon={<RemoveProductIcon />}
            variation="light"
            onClick={() => handleProductItem("remove")}
          />
        ) : (
          <Button
            text="담기"
            icon={<AddProductIcon />}
            variation="dark"
            onClick={() => handleProductItem("add")}
          />
        )}
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
