import BaseButton from '@/components/button/BaseButton';

import { STYLE_THEME } from '@/styles/constants/theme';
import styled from '@emotion/styled';

interface QuantityButtonProps {
  quantity: number;
  onClick: () => void;
}

interface PlusButtonProps extends QuantityButtonProps {
  max?: number;
}

interface MinusButtonProps extends QuantityButtonProps {
  min?: number;
}

export const PlusButton = ({
  max = 20, // 임의로 max 값을 20으로 설정
  quantity,
  onClick,
}: PlusButtonProps) => {
  const isDisabled = max ? quantity >= max : false;

  return (
    <S.BaseButton
      onClick={onClick}
      aria-label="수량 증가"
      disabled={isDisabled}
      $theme={isDisabled ? 'disabled' : 'white'}
      $width="24px"
      $height="24px"
    >
      +
    </S.BaseButton>
  );
};

export const MinusButton = ({
  min = 1,
  quantity,
  onClick,
}: MinusButtonProps) => {
  const isDisabled = quantity <= min;

  return (
    <S.BaseButton
      onClick={onClick}
      aria-label="수량 감소"
      disabled={isDisabled}
      $theme={isDisabled ? 'disabled' : 'white'}
      $width="24px"
      $height="24px"
    >
      -
    </S.BaseButton>
  );
};

const S = {
  BaseButton: styled(BaseButton)`
    border: 1px solid ${STYLE_THEME.color.blackWithOpacity};
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  `,
};
