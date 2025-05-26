import * as S from './ModalItem.styled';
import QuantityButton from '../QuantityButton/QuantityButton';
import { useProductItem } from '../ProductItem/hooks/useProductItem';

function ModalItem({ itemId, imageUrl, name, price }: { itemId: number; imageUrl: string; name: string; price: number }) {
  const { quantity, handleProductItem } = useProductItem(itemId);
  return (
    <S.StyledItem>
      <img src={imageUrl} alt={name} style={{ width: '80px', aspectRatio: '1/1', borderRadius: '8px' }} />
      <S.StyledItemInfo>
        <S.StyledItemInfoTitle>{name}</S.StyledItemInfoTitle>
        <p>{(price * quantity!).toLocaleString()}원</p>
        <QuantityButton
          quantity={quantity!}
          handleAddQuantity={() => handleProductItem('update', itemId, quantity! + 1)}
          handleSubtractQuantity={() => handleProductItem('update', itemId, quantity! - 1)}
        />
      </S.StyledItemInfo>
      <S.DeleteButton onClick={() => handleProductItem('delete', itemId)}>삭제</S.DeleteButton>
    </S.StyledItem>
  );
}

export default ModalItem;
