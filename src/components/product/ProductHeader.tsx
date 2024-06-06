import { useState } from 'react';
import useCartItems from '../../hooks/useCartItems/useCartItems';
import CartIcon from '../../assets/CartIcon.svg';
import * as S from './ProductHeader.styled';
import { SIZE } from '../../constants/api';

const ProductHeader = () => {
  const { cartItems } = useCartItems();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* <Modal isOpen={isOpen} onClose={handleClose} /> */}
      <p>SHOP</p>
      <S.CartIconWrapper onClick={handleOpen}>
        <img src={CartIcon} alt="장바구니 아이콘" />
        {cartItems.length > 0 && (
          <S.CartNumber>{cartItems.length <= SIZE.DEFAULT ? cartItems.length : `${SIZE.DEFAULT}+`}</S.CartNumber>
        )}
      </S.CartIconWrapper>
    </>
  );
};

export default ProductHeader;
