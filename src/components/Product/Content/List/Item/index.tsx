import { ProductItemType } from "@/types/product";
import AddCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Add";
import * as S from "./ProductItem.styled";
import defaultImage from "@/assets/images/planet-error.png";
import { SyntheticEvent, useContext } from "react";
import { CartItemType } from "@/types/cartItem";
import { APIContext } from "@/context/APIContext";
import QuantityCounter from "@/components/QuantityCounter";
import { removeCartItem } from "@/apis/cartItems/removeCartItem";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import { updateCartItems } from "@/apis/cartItems/updateCartItems";
import AlertToast from "@/components/AlertToast";

interface ProductItemProps {
  product: ProductItemType;
  variant?: "default" | "cart";
}

function ProductItem({ product, variant }: ProductItemProps) {
  const context = useContext(APIContext);

  if (!context)
    throw new Error("APIContext must be used within a DataProvider");
  const { data, setData, error, setError } = context;

  const cartItemData = data.cartItemData as CartItemType[];

  const { id, name, price, imageUrl, quantity } = product;
  const findCartItem = cartItemData.find(({ product }) => product.id === id);

  const cartQuantity = findCartItem ? findCartItem.quantity : 1;
  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage;
  };

  const handleIncrease = async () => {
    const newQuantity = cartQuantity + 1;

    if (newQuantity > quantity) {
      setError((prev) => ({
        ...prev,
        cartItemData:
          error instanceof Error
            ? error.message
            : "재고 수량을 초과해서 담을 수 없습니다.",
      }));
      return;
    }

    if (findCartItem) {
      try {
        await updateCartItems({
          productId: findCartItem.product.id,
          quantity: newQuantity,
        });
        const updatedCartItems = await getCartItems();
        setData((prev) => ({
          ...prev,
          cartItemData: updatedCartItems,
        }));
      } catch (error) {
        setError((prev) => ({
          ...prev,
          cartItemData:
            error instanceof Error
              ? error.message
              : "상품의 수량을 증가시키는 과정에서 오류가 발생하였습니다.",
        }));
      }
    }
  };
  const handleDecrease = async () => {
    if (cartQuantity === 1) {
      // 수량 1이면 삭제
      if (findCartItem) {
        await removeCartItem(findCartItem.id);
        try {
          const updatedCartItems = await getCartItems();

          setData((prev) => ({
            ...prev,
            cartItemData: updatedCartItems,
          }));
        } catch (error) {
          setError((prev) => ({
            ...prev,
            cartItemData:
              error instanceof Error
                ? error.message
                : "장바구니에서 상품을 삭제하는 과정에서 오류가 발생하였습니다.",
          }));
        }
      }
    } else {
      const newQuantity = cartQuantity - 1;

      if (findCartItem) {
        try {
          await updateCartItems({
            productId: findCartItem.product.id,
            quantity: newQuantity,
          });
          const updatedCartItems = await getCartItems();
          setData((prev) => ({
            ...prev,
            cartItemData: updatedCartItems,
          }));
        } catch (error) {
          setError((prev) => ({
            ...prev,
            cartItemData:
              error instanceof Error
                ? error.message
                : "상품의 수량을 감소시키는 과정에서 오류가 발생하였습니다.",
          }));
        }
      }
    }
  };

  return (
    <S.Item variant={variant}>
      {error.cartItemData && (
        <AlertToast type="error" message={error.cartItemData} />
      )}{" "}
      <S.ImageWrapper variant={variant}>
        {quantity <= 0 && (
          <S.ItemBackDrop>
            <S.SoldOutText>품 절</S.SoldOutText>
          </S.ItemBackDrop>
        )}
        <S.ProductImage src={imageUrl} alt={name} onError={handleImageError} />
      </S.ImageWrapper>
      <S.Content variant={variant}>
        <S.ProductInfo>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
        </S.ProductInfo>
        <S.ButtonWrapper variant={variant}>
          {!findCartItem ? (
            <AddCartItemButton id={id} disabled={quantity <= 0} />
          ) : (
            <QuantityCounter
              quantity={cartQuantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          )}
        </S.ButtonWrapper>
      </S.Content>
    </S.Item>
  );
}

export default ProductItem;
