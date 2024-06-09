import BaseButton from '@/components/button/BaseButton';
import Toast from '@/components/Toast';

import { STYLE_THEME } from '@/styles/constants/theme';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  $theme?: 'black' | 'white' | 'gray' | 'disabled';
  onClick: () => void;
  error?: Error | null;
}

const CartControlButton = ({
  children,
  $theme = 'black',
  onClick,
  error,
}: Props) => {
  return (
    <S.StyledBaseButton $theme={$theme} onClick={onClick}>
      <S.ButtonContent>{children}</S.ButtonContent>
      {error && <Toast message={error.message} />}
    </S.StyledBaseButton>
  );
};

export default CartControlButton;

const S = {
  StyledBaseButton: styled(BaseButton)`
    border: 1px solid ${STYLE_THEME.color.blackWithOpacity};
  `,

  ButtonContent: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    font-size: ${STYLE_THEME.fontSize.xs};
    font-weight: ${STYLE_THEME.fontWeight.medium};
  `,
};
