import { ProductItemType } from "@/types/product";
import AddCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Add";
import * as S from "./ProductItem.styled";
import defaultImage from "@/assets/images/planet-error.png";
import { SyntheticEvent, useContext, useState } from "react";
import { CartItemType } from "@/types/cartItem";
import { DataContext } from "@/context/DataContext";
import QuantityCounter from "@/components/QuantityCounter";
import { removeCartItem } from "@/apis/cartItems/removeCartItem";
import { getCartItems } from "@/apis/cartItems/getCartItems";
import { updateCartItems } from "@/apis/cartItems/updateCartItems";

interface ProductItemProps {
  product: ProductItemType;
  variant?: "default" | "cart";
}

function ProductItem({ product, variant }: ProductItemProps) {
  const context = useContext(DataContext);

  if (!context)
    throw new Error("DataContext must be used within a DataProvider");
  const { data, setData } = context;

  const cartItemData = data.cartItemData as CartItemType[];

  const { id, name, price, imageUrl } = product;
  const findCartItem = cartItemData.find(({ product }) => product.id === id);

  const quantity = findCartItem ? findCartItem.quantity : 1;
  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage;
  };

  const [isAdded, setIsAdded] = useState(false);

  const handleIncrease = async () => {
    const newQuantity = quantity + 1;

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
        console.error("수량 증가 실패", error);
      }
    }
  };
  const handleDecrease = async () => {
    if (quantity === 1) {
      // 수량 1이면 삭제
      if (findCartItem) {
        await removeCartItem(findCartItem.id);
        try {
          const updatedCartItems = await getCartItems();

          setData((prev) => ({
            ...prev,
            cartItemData: updatedCartItems,
          }));

          setIsAdded(false);
        } catch (error) {
          console.error("장바구니 삭제 실패:", error);
        }
      }
    } else {
      const newQuantity = quantity - 1;

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
          console.error("수량 감소 실패", error);
        }
      }
    }
  };

  return (
    <S.Item variant={variant}>
      <S.ImageWrapper variant={variant}>
        <S.ProductImage src={imageUrl} alt={name} onError={handleImageError} />
      </S.ImageWrapper>
      <S.Content variant={variant}>
        <S.ProductInfo>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
        </S.ProductInfo>
        <S.ButtonWrapper variant={variant}>
          {!isAdded && !findCartItem ? (
            <AddCartItemButton id={id} />
          ) : (
            findCartItem && (
              <QuantityCounter
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            )
          )}
        </S.ButtonWrapper>
      </S.Content>
    </S.Item>
  );
}

export default ProductItem;
