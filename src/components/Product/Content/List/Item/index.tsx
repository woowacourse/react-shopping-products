import { ProductItemType } from "@/types/product";
import AddCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Add";
import RemoveCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Remove";
import * as S from "./ProductItem.styled";
import { SetCartItems } from "@/types/cartItem";

interface ProductItemProps {
  product: ProductItemType;
  isAddedToCart: boolean;
  setCartItems: SetCartItems;
}

function ProductItem({
  product,
  isAddedToCart,
  setCartItems,
}: ProductItemProps) {
  const { id, name, price, imageUrl } = product;

  return (
    <S.Item>
      <S.ImageWrapper>
        <S.ProductImage src={imageUrl} alt={name} />
      </S.ImageWrapper>
      <S.Content>
        <S.ProductInfo>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
        </S.ProductInfo>
        <S.ButtonWrapper>
          {isAddedToCart ? (
            <RemoveCartItemButton id={id} setCartItems={setCartItems} />
          ) : (
            <AddCartItemButton id={id} setCartItems={setCartItems} />
          )}
        </S.ButtonWrapper>
      </S.Content>
    </S.Item>
  );
}

export default ProductItem;
