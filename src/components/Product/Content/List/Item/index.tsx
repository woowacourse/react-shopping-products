import { ProductItemType } from "@/apis/products/product.type";
import AddCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Add";
import RemoveCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Remove";
import * as S from "./ProductItem.styled";
import defaultImage from "@/assets/images/planet-error.png";
import { SyntheticEvent } from "react";
import { useCartItemContext } from "@/contexts/CartItemProvider";

interface ProductItemProps {
  product: ProductItemType;
}

function ProductItem({ product }: ProductItemProps) {
  const { id, name, price, imageUrl } = product;
  const { cartItems } = useCartItemContext();
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
            <RemoveCartItemButton id={findCartItem.id} />
          ) : (
            <AddCartItemButton id={id} />
          )}
        </S.ButtonWrapper>
      </S.Content>
    </S.Item>
  );
}

export default ProductItem;
