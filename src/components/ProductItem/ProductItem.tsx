import * as S from "./ProductItem.styled";
import AddProductIcon from "../Icon/AddProductIcon";
import Button from "../common/Button/Button";
import blackDefaultImage from "../../assets/blackDefaultImage.png";
import { ResponseProduct } from "../../api/types";
import QuantityButton from "../common/QuantityButton/QuantityButton";
import { useCart } from "../../hooks/useCart";

function ProductItem({
  product,
  isInModal = false,
}: {
  product: ResponseProduct;
  isInModal?: boolean;
}) {
  const {
    cartItemList,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    getCartQuantityForProduct,
    setCartActionErrorMessage,
  } = useCart();

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
          await handleRemoveFromCart(cartItemId);
        }
      } else {
        await handleAddToCart(product.id, 1);
      }
    } catch (error) {
      if (error instanceof Error) {
        setCartActionErrorMessage(error.message);
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
              onIncrease={() => handleIncreaseQuantity(product.id)}
              onDecrease={() => handleDecreaseQuantity(product.id)}
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
            onIncrease={() => handleIncreaseQuantity(product.id)}
            onDecrease={() => handleDecreaseQuantity(product.id)}
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
