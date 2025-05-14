import { ProductItemType } from "@/types/product";
import AddCartItemButton from "@/components/Product/List/Item/CardItemButton/Add";
import RemoveCartItemButton from "@/components/Product/List/Item/CardItemButton/Remove";
import * as S from "./ProductItem.styled";

interface ProductItemProps {
  product: ProductItemType;
  isAddedToCart: boolean;
}

function ProductItem({ product, isAddedToCart }: ProductItemProps) {
  const { name, price, imageUrl } = product;

  const handleAddToCart = () => {
    // TODO: 장바구니에 추가하는 로직
  };

  const handleRemoveFromCart = () => {
    // TODO: 장바구니에서 제거하는 로직
  };

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
            <RemoveCartItemButton onClick={handleRemoveFromCart} />
          ) : (
            <AddCartItemButton onClick={handleAddToCart} />
          )}
        </S.ButtonWrapper>
      </S.Content>
    </S.Item>
  );
}

export default ProductItem;
