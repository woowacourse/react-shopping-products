import { IMAGE_PATH } from '../../constants/imagePath';
import CartUpdateButton from '../CartBottomButton/CartUpdateButton';
import * as S from './Modal.styled';
import { useFetchCartItems } from '../../hooks/useFetchCartItems';
import { ERROR_MSG } from '../../constants/errorMessage';

type ModalProductItemProps = {
  id: number;
  cartId: number;
  name: string;
  price: number;
  imageUrl: string;
};

const ModalProductItem = ({ id, cartId, name, price, imageUrl }: ModalProductItemProps) => {
  const { removeFromCart } = useFetchCartItems();

  const handleDeleteButton = async () => {
    try {
      await removeFromCart(cartId);
    } catch (error) {
      console.error(ERROR_MSG.CART_REMOVE_FAIL, error);
    }
  };

  return (
    <S.ModalProductContainer>
      <S.ModalBr />
      <S.ModalProductItemContainer>
        <S.ModalProductItemImage
          src={imageUrl || IMAGE_PATH.DEFAULT_MODAL}
          alt={name}
          onError={(e) => {
            const target = e.currentTarget;
            target.src = IMAGE_PATH.DEFAULT_MODAL;
          }}
        />
        <S.ModalProductItemContentContainer>
          <div id="left-container">
            <S.ModalProductItemName>{name}</S.ModalProductItemName>
            <S.ModalProductItemPrice>{price.toLocaleString()}원</S.ModalProductItemPrice>
            <CartUpdateButton id={id} />
          </div>
          <S.ModalProductItemDeleteButton onClick={handleDeleteButton}>
            삭제
          </S.ModalProductItemDeleteButton>
        </S.ModalProductItemContentContainer>
      </S.ModalProductItemContainer>
    </S.ModalProductContainer>
  );
};

export default ModalProductItem;
