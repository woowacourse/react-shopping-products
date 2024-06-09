import useQuantityControls from '../../../hooks/useQuantityControls';
import { BorderButton } from '../BorderButton/style';
import * as S from './style';

import MinusIcon from '../../../assets/images/minusIcon.png';
import PlusIcon from '../../../assets/images/plusIcon.png';

interface QuantityButtonProps {
  productId: number;
}

export default function QuantityButton({ productId }: QuantityButtonProps) {
  const { quantity, increase, decrease } = useQuantityControls({ productId });

  return (
    <S.QuantityControls>
      <BorderButton onClick={decrease} size="small">
        <img src={MinusIcon} alt="감소 버튼 아이콘" />
      </BorderButton>

      <S.Quantity>{quantity}</S.Quantity>

      <BorderButton onClick={increase} size="small">
        <img src={PlusIcon} alt="증가 버튼 아이콘" />
      </BorderButton>
    </S.QuantityControls>
  );
}
