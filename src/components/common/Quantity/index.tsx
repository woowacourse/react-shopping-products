import { MINUS, PLUS } from '../../../assets/images';
import * as S from './style';

interface QuantityProps {
  quantity: number;
}

const Quantity = ({ quantity }: QuantityProps) => {
  return (
    <S.QuantityContainer>
      <S.CountButton>
        <S.CountImage src={MINUS} />
      </S.CountButton>
      <S.QuantityText>{quantity}</S.QuantityText>
      <S.CountButton>
        <S.CountImage src={PLUS} />
      </S.CountButton>
    </S.QuantityContainer>
  );
};

export default Quantity;
