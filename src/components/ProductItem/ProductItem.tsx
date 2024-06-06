import { Product } from '../../types/Product.type';
import AddCart from '../../assets/AddCart.svg';
import Button from '../Button/Button';
import QuantityStepper from '../QuantityStepper/QuantityStepper';
import * as S from './ProductItem.style';

interface ProductItemProps {
  product: Product;
  quantity: number;
  onAddCartItem: (productId: number) => void;
  onUpdateCartItemQuantity: (productId: number, quantity: number) => void;
}

const ProductItem = ({ product, quantity, onAddCartItem, onUpdateCartItemQuantity }: ProductItemProps) => {
  const { id, name, price, imageUrl } = product;

  return (
    <S.Layout>
      <S.ImageWrapper src={imageUrl} alt={name} />
      <S.Container>
        <S.TextContainer>
          <h2>{name}</h2>
          <p>{price.toLocaleString()}원</p>
        </S.TextContainer>
        <S.CartButtonContainer>
          {quantity !== 0 ? (
            <QuantityStepper
              quantity={quantity}
              onMinusButtonClick={() => onUpdateCartItemQuantity(id, quantity - 1)}
              onPlusButtonClick={() => onUpdateCartItemQuantity(id, quantity + 1)}
            />
          ) : (
            <Button onClick={() => onAddCartItem(id)}>
              <S.Icon src={AddCart} alt="장바구니 담기" />
              <p>담기</p>
            </Button>
          )}
        </S.CartButtonContainer>
      </S.Container>
    </S.Layout>
  );
};

export default ProductItem;
