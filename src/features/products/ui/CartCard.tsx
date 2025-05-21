import {useState} from 'react';
import CustomButton from '../../../shared/ui/CustomButton';
import * as S from './CartCard.styles';
import CartCount from './CartCount';

export default function CartCard() {
  const [quantity, setQuantity] = useState(0);

  return (
    <>
      <S.CardContainer>
        <S.ImgSection src="./emptyImage.jpg" />
        <S.ProductInfoSection>
          <S.ProductName>상품 이름</S.ProductName>
          <S.ProductPrice>35,000원</S.ProductPrice>
          <CartCount
            count={quantity}
            onPlusCount={() => setQuantity((prev) => prev + 1)}
            onMinusCount={() => {
              quantity > 0 && setQuantity((prev) => prev - 1);
            }}
          />
        </S.ProductInfoSection>
        <S.ButtonSection>
          <CustomButton title="삭제" onClick={() => {}} />
        </S.ButtonSection>
      </S.CardContainer>
      <S.Line />
    </>
  );
}
