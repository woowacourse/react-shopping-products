import * as S from './style';

import { useContext, useEffect, useState } from 'react';

import { UseCartItemsContext } from '../../App';
import { CartItem } from '../../types/cart';
import Spinner from '../Spinner';

interface RemoveButtonProps {
  cartItem: CartItem;
}

const RemoveButton = ({ cartItem }: RemoveButtonProps) => {
  const { getCartItems, deleteCartItem } = useContext(UseCartItemsContext);
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
