import * as S from './style';

import { useEffect, useState } from 'react';

import Spinner from '../Spinner';
import useCartItems from '../../hooks/useCartItems';

import { CartItem } from '../../types/cart';

interface RemoveButtonProps {
  cartItem: CartItem;
}

const RemoveButton = ({ cartItem }: RemoveButtonProps) => {
  const { getCartItems, deleteCartItem } = useCartItems();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteFromCart = () => {
    setIsLoading(true);

    return deleteCartItem.mutate(cartItem.id, {
      onError: () => setIsLoading(false),
    });
  };

  useEffect(() => {
    setIsLoading(false);
  }, [getCartItems.data?.length]);

  return (
    <>
      {isLoading ? (
        <S.RemoveButton>
          <Spinner />
        </S.RemoveButton>
      ) : (
        <S.RemoveButton onClick={handleDeleteFromCart}>삭제</S.RemoveButton>
      )}
    </>
  );
};

export default RemoveButton;
