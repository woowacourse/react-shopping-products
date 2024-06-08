import BaseButton from '@/components/button/BaseButton';

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
    <S.StyledBaseButton
      onClick={onClick}
      disabled={isDisabled}
      $theme={isDisabled ? 'disabled' : 'white'}
      $width="24px"
      $height="24px"
    >
      +
    </S.StyledBaseButton>
  );
};

export const MinusButton = ({
  min = 1,
  quantity,
  onClick,
}: MinusButtonProps) => {
  const isDisabled = quantity <= min;

  return (
    <S.StyledBaseButton
      onClick={onClick}
      disabled={isDisabled}
      $theme={isDisabled ? 'disabled' : 'white'}
      $width="24px"
      $height="24px"
    >
      -
    </S.StyledBaseButton>
  );
};

const S = {
  StyledBaseButton: styled(BaseButton)`
    border: 1px solid #0000001a;
  `,
};
