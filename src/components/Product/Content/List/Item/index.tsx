import { ProductItemType } from "@/types/product";
import AddCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Add";
import RemoveCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Remove";
import * as S from "./ProductItem.styled";
import { OnAddToCart, OnRemoveToCart } from "@/types/cartItem";

interface ProductItemProps {
  product: ProductItemType;
  isAddedToCart: boolean;
  onAddToCart: OnAddToCart;
  onRemoveToCart: OnRemoveToCart;
}

function ProductItem({
  product,
  isAddedToCart,
  onAddToCart,
  onRemoveToCart,
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
            <RemoveCartItemButton onClick={() => onRemoveToCart(id)} />
          ) : (
            <AddCartItemButton
              onClick={() =>
                onAddToCart({
                  productId: id,
                  quantity: 1,
                })
              }
            />
          )}
        </S.ButtonWrapper>
      </S.Content>
    </S.Item>
  );
}

export default ProductItem;
