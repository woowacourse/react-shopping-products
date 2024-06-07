import { Product } from '../../types/Product.type';
import AddCart from '../../assets/AddCart.svg';
import Button from '../Button/Button';
import useAddCartItem from '../../hooks/mutations/useAddCartItem';
import useUpdateCartItemQuantity from '../../hooks/mutations/useUpdateCartItemQuantity';
import QuantityStepper from '../QuantityStepper/QuantityStepper';
import * as S from './ProductItem.style';

interface ProductItemProps {
  product: Product;
  quantity: number;
}

const ProductItem = ({ product, quantity }: ProductItemProps) => {
  const { id, name, price, imageUrl } = product;

  const { handleAddCartItem } = useAddCartItem();
  const { handleUpdateCartItemQuantity } = useUpdateCartItemQuantity();

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
              onMinusButtonClick={() => handleUpdateCartItemQuantity(id, quantity - 1)}
              onPlusButtonClick={() => handleUpdateCartItemQuantity(id, quantity + 1)}
            />
          ) : (
            <Button onClick={() => handleAddCartItem(id)}>
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
