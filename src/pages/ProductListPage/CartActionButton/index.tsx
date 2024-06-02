import AddIcon from '@assets/addCart.svg';
import DeleteIcon from '@assets/deleteCart.svg';
import style from './style.module.css';
import { useAddCartItem, useDeleteCartItem } from '@hooks/index';
import { fetchGetCartItems } from '@apis/index';
import { CartItem } from '@appTypes/index';
import { useEffect, useState } from 'react';

type ButtonType = 'add' | 'delete';

interface CartActionButtonProps {
  cartItem: CartItem;
  productId: number;
}

interface ButtonInfo {
  src: string;
  alt: string;
  text: string;
}

const BUTTON_INFO: Record<ButtonType, ButtonInfo> = {
  add: {
    src: AddIcon,
    alt: '상품 담기',
    text: '담기',
  },
  delete: {
    src: DeleteIcon,
    alt: '상품 빼기',
    text: '빼기',
  },
};

function CartActionButton({ cartItem, productId }: CartActionButtonProps) {
  const isInCart = cartItem !== undefined;
  const buttonType = isInCart ? 'delete' : 'add';

  const { src, alt, text } = BUTTON_INFO[buttonType];
  const className = `${style.button} ${style[buttonType]}`;

  const [, setLoading] = useState(false);
  const [, setError] = useState('');

  const refetch = async () => {
    try {
      setLoading(true);
      await fetchGetCartItems();
      setError('');
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const { addCartItem, loading: addLoading, error: addError } = useAddCartItem(refetch);
  const { deleteCarItem, loading: deleteLoading, error: deleteError } = useDeleteCartItem(refetch);

  const onAction = async () => {
    if (isInCart) {
      await deleteCarItem(cartItem);
      return;
    }

    await addCartItem(productId);
  };

  const isPending = addLoading || deleteLoading;

  useEffect(() => {
    if (addError || deleteError) {
      throw new Error('삭제 추가하는 도중 에러가 발생했습니다.');
    }
  });

  return (
    <button onClick={onAction} className={className} disabled={isPending}>
      <img src={src} alt={alt} />
      <span className="button__text">{text}</span>
    </button>
  );
}

export default CartActionButton;
