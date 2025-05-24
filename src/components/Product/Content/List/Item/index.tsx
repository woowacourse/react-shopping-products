import { ProductItemType } from "@/apis/products/product.type";
import AddCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Add";
import * as S from "./ProductItem.styled";
import defaultImage from "@/assets/images/planet-error.png";
import { SyntheticEvent } from "react";
import { useCartItemContext } from "@/contexts/CartItemProvider";
import CartItemQuantityButton from "./CardItemButton/Quantity";

interface ProductItemProps {
  product: ProductItemType;
}

function ProductItem({ product }: ProductItemProps) {
  const { cartItems } = useCartItemContext();
  const { id, name, price, imageUrl, quantity } = product;
  const findCartItem = cartItems.find(({ product }) => product.id === id);
  const isSoldOut = quantity < 1;

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage;
  };

  return (
    <S.Item>
      <S.ImageWrapper isSoldOut={isSoldOut}>
        {isSoldOut && <S.SoldOutText>품절</S.SoldOutText>}
        <S.ProductImage src={imageUrl} alt={name} onError={handleImageError} />
      </S.ImageWrapper>
      <S.Content>
        <S.ProductInfo>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
        </S.ProductInfo>
        {!isSoldOut && (
          <S.ButtonWrapper>
            {findCartItem ? (
              <CartItemQuantityButton
                cartItemId={findCartItem.id}
                quantity={findCartItem.quantity}
              />
            ) : (
              <AddCartItemButton id={id} />
            )}
          </S.ButtonWrapper>
        )}
      </S.Content>
    </S.Item>
  );
}

export default ProductItem;
