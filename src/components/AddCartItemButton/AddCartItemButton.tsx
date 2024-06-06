import { AddToCartIcon } from '../../assets';
import Button from '../common/Button/Button';

import * as S from './AddCartItemButton.style';

interface AddCartItemButtonProps {
  onClick: () => void;
}

function AddCartItemButton({ onClick }: AddCartItemButtonProps) {
  return (
    <Button width={60} size="s" radius="s" color="primary" onClick={onClick}>
      <S.ButtonContent>
        <AddToCartIcon />
        <S.Content>담기</S.Content>
      </S.ButtonContent>
    </Button>
  );
}

export default AddCartItemButton;
