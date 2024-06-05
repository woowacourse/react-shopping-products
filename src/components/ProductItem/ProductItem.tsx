import { Product } from '../../types/Product.type';
import AddCart from '../../assets/AddCart.svg';
import MinusIcon from '../../assets/MinusIcon.svg';
import PlusIcon from '../../assets/PlusIcon.svg';
import Button from '../Button/Button';
import * as S from './ProductItem.style';

interface ProductItemProps {
  product: Product;
  isAdded: boolean;
  onAddCartItem: (productId: number) => void;
  onDeleteCartItem: (productId: number) => void;
}

const ProductItem = ({ product, isAdded, onAddCartItem }: ProductItemProps) => {
  const { id, name, price, imageUrl } = product;

  return (
    <S.Layout>
      <S.ImageWrapper src={imageUrl} alt={name} />
      <S.Container>
        <S.TextContainer>
          <strong>{name}</strong>
          <p>상품 설명</p>
          <p>{price}원</p>
        </S.TextContainer>
        <S.CartButtonContainer>
          {isAdded ? (
            <S.CartItemQuantityControls>
              <Button
                variant="secondary"
                size="small"
                // onClick={() => handleUpdateQuantity(product, Math.max(quantity - 1, 1))}
              >
                <img src={MinusIcon} alt="장바구니 1개 빼기" />
              </Button>
              <p>수량</p>
              <Button
                variant="secondary"
                size="small"
                // onClick={() => handleUpdateQuantity(product, quantity + 1)}
              >
                <img src={PlusIcon} alt="장바구니 1개 담기" />
              </Button>
            </S.CartItemQuantityControls>
          ) : (
            <Button size="medium" onClick={() => onAddCartItem(id)}>
              <S.AddCartIcon src={AddCart} alt="장바구니 담기" />
              <p>담기</p>
            </Button>
          )}
        </S.CartButtonContainer>
      </S.Container>
    </S.Layout>
  );
};

export default ProductItem;
