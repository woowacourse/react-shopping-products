import { ProductItemType } from "@/apis/products/product.type";
import AddCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Add";
import RemoveCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Remove";
import * as S from "./ProductItem.styled";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import defaultImage from "@/assets/images/planet-error.png";
import { SyntheticEvent } from "react";

interface ProductItemProps {
  product: ProductItemType;
  cartItems: CartItemType[];
  updateCartItems: (newCartItems: CartItemType[]) => void;
}

function ProductItem({
  product,
  cartItems,
  updateCartItems,
}: ProductItemProps) {
  const { id, name, price, imageUrl } = product;
  const findCartItem = cartItems.find(({ product }) => product.id === id);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage;
  };

  return (
    <S.Item>
      <S.ImageWrapper>
        <S.ProductImage src={imageUrl} alt={name} onError={handleImageError} />
      </S.ImageWrapper>
      <S.Content>
        <S.ProductInfo>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
        </S.ProductInfo>
        <S.ButtonWrapper>
          {findCartItem ? (
            <RemoveCartItemButton
              id={findCartItem.id}
              updateCartItems={updateCartItems}
            />
          ) : (
            <AddCartItemButton id={id} updateCartItems={updateCartItems} />
          )}
        </S.ButtonWrapper>
      </S.Content>
    </S.Item>
  );
}

export default ProductItem;
