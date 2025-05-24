import QuantitySelector from "../../@common/QuantitySelector/QuantitySelector";
import * as S from "./ProductItem.styles";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  increaseItemQuantity: () => void;
  decreaseItemQuantity: () => void;
  deleteProductInCart: () => void;
  decreaseDisabled?: boolean;
  increaseDisabled?: boolean;
}

const ProductItem = ({
  imageUrl,
  name,
  price,
  quantity,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteProductInCart,
  decreaseDisabled,
  increaseDisabled,
}: Props) => {
  return (
    <S.ProductItem>
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductInfo>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
          <QuantitySelector
            quantity={quantity}
            onIncrease={increaseItemQuantity}
            onDecrease={decreaseItemQuantity}
            decreaseDisabled={decreaseDisabled}
            increaseDisabled={increaseDisabled}
          />
        </S.ProductInfo>
        <S.DeleteButton onClick={deleteProductInCart}>삭제</S.DeleteButton>
      </S.ProductWrapper>
    </S.ProductItem>
  );
};

export default ProductItem;
