import { CartItemsAPI } from "../../apis/cartItems";
import CartItemButton from "./components/CartItemButton/CartItemButton";
import * as S from "./ProductItem.styles";

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  isAdd: boolean;
}

const ProductItem = ({
  id,
  imageUrl,
  name,
  price,
  isAdd,
}: ProductItemProps) => {
  const handleClick = () => {
    CartItemsAPI.post(id);
  };

  return (
    <S.ProductContainer>
      <S.ProductImage $url={imageUrl} />
      <S.ProductWrapper>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price}</S.ProductPrice>
        <CartItemButton isAdd={isAdd} onClick={handleClick} />
      </S.ProductWrapper>
    </S.ProductContainer>
  );
};

export default ProductItem;
