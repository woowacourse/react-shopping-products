import * as S from './style';

import { useEffect, useState } from 'react';

import Spinner from '../Spinner';
import useCartItems from '../../hooks/useCartItems';

import { ADD_TO_CART } from '../../assets/images';

interface AddButtonProps {
  id: number;
}

const AddButton = ({ id }: AddButtonProps) => {
  const { getCartItems, addCartItem } = useCartItems();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);

    addCartItem.mutate(id, {
      onError: () => setIsLoading(false),
    });
  };

  useEffect(() => {
    setIsLoading(false);
  }, [getCartItems.data?.length]);

  return (
    <S.AddButton onClick={handleAddToCart}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <S.ButtonImage src={ADD_TO_CART} alt="담기" />
          <span>담기</span>
        </>
      )}
    </S.AddButton>
  );
};

export default AddButton;
