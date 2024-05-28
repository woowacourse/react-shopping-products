import { ShoppingCartIcon } from '../../assets';
import { BaseButton } from './BaseButton';
import { StyledCartButtonImg } from './CartButton.styled';

export const CartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <BaseButton onClick={onClick}>
      <StyledCartButtonImg src={ShoppingCartIcon} />
    </BaseButton>
  );
};
