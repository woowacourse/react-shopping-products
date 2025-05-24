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

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage;
  };

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = async () => {
    if (quantity === 1) {
      if (findCartItem) {
        try {
          await removeCartItem(findCartItem.id);
          const updatedCartItems = await getCartItems();

          setData((prev) => ({
            ...prev,
            cartItemData: updatedCartItems,
          }));

          setIsAdded(false);
          setQuantity(1);
        } catch (error) {
          console.error("Failed to remove item from cart:", error);
        }
      }
    } else {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = () => {
    setIsAdded(true);
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
            <AddCartItemButton id={id} onClick={handleAddToCart} />
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
