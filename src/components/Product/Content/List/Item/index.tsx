import { ProductItemType } from "@/types/product";
import AddCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Add";
import RemoveCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Remove";
import * as S from "./ProductItem.styled";
import { CartItemType, SetCartItems } from "@/types/cartItem";
import defaultImage from "@/assets/images/planet-error.png";
import { SyntheticEvent } from "react";

interface ProductItemProps {
  product: ProductItemType;
  cartItems: CartItemType[];
  setCartItems: SetCartItems;
}

function ProductItem({ product, cartItems, setCartItems }: ProductItemProps) {
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
              setCartItems={setCartItems}
            />
          ) : (
            <AddCartItemButton id={id} setCartItems={setCartItems} />
          )}
        </S.ButtonWrapper>
      </S.Content>
    </S.Item>
  );
}

export default ProductItem;
