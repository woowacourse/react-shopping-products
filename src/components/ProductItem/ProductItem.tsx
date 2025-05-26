import * as S from "./ProductItem.styled";
import AddProductIcon from "../Icon/AddProductIcon";
import Button from "../common/Button/Button";
import blackDefaultImage from "../../assets/blackDefaultImage.png";
import { ResponseCartItem, ResponseProduct } from "../../api/types";
import QuantityButton from "../common/QuantityButton/QuantityButton";

function ProductItem({
  product,
  cartItemList,
  onAddToCart,
  onRemoveFromCart,
  setErrorMessage,
  onIncreaseQuantity,
  onDecreaseQuantity,
  getCartQuantityForProduct,
  isInModal = false,
}: {
  product: ResponseProduct;
  cartItemList: ResponseCartItem[];
  onAddToCart: (productId: number, quantity: number) => Promise<void>;
  onRemoveFromCart: (cartItemId: number) => Promise<void>;
  setErrorMessage: (message: string) => void;
  onIncreaseQuantity: (productId: number) => Promise<void>;
  onDecreaseQuantity: (productId: number) => Promise<void>;
  getCartQuantityForProduct: (productId: number) => number;
  isInModal?: boolean;
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
        await onAddToCart(product.id, 1);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }

  const isSoldOut = product.quantity === 0;

  if (isInModal) {
    return (
      <S.ModalProductItemContainer>
        <S.ModalImageContainer>
          <S.ModalProductItemImage
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = blackDefaultImage;
              e.currentTarget.onerror = null;
            }}
          />
          {isSoldOut && (
            <S.ModalSoldOutOverlay>
              <S.SoldOutText>품절</S.SoldOutText>
            </S.ModalSoldOutOverlay>
          )}
        </S.ModalImageContainer>

        <S.ModalProductContent>
          <S.ModalProductName>{product.name}</S.ModalProductName>
          <S.ModalProductPrice>
            {product.price.toLocaleString()}원
          </S.ModalProductPrice>

          {isInCart(product.id) ? (
            <QuantityButton
              quantity={getCartQuantityForProduct(product.id)}
              onIncrease={() => onIncreaseQuantity(product.id)}
              onDecrease={() => onDecreaseQuantity(product.id)}
            />
          ) : (
            <Button
              text="담기"
              icon={<AddProductIcon />}
              variation="dark"
              onClick={() => handleProductItem("add")}
            />
          )}
        </S.ModalProductContent>
      </S.ModalProductItemContainer>
    );
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
      {isSoldOut && (
        <S.SoldOutOverlay>
          <S.SoldOutText>품절</S.SoldOutText>
        </S.SoldOutOverlay>
      )}
      <S.ProductItemBottom>
        <S.ProductItemDetailBox>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.ProductItemDetailBox>
        {isInCart(product.id) ? (
          <QuantityButton
            quantity={getCartQuantityForProduct(product.id)}
            onIncrease={() => onIncreaseQuantity(product.id)}
            onDecrease={() => onDecreaseQuantity(product.id)}
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
