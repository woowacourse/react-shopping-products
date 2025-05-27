import {css} from '@emotion/react';
import CustomButton from '../../../shared/ui/CustomButton';
import {deleteCartProduct} from '../../cart/api/deleteCartProduct';
import {postCartProduct} from '../../cart/api/postCartProduct';
import {Product} from '../type/product';
import * as S from './ProductCard.styles';
import {useShowError} from '../../../shared/provider/errorProvider';
import {useState} from 'react';
import CartCount from '../../cart/ui/CartCount';
import {formatPrice} from '../../../shared/utils/formatPrice';
import {useApi} from '../provider/apiProvider';
import {getCartProduct} from '../../cart/api/getCartProduct';

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  cartId: number | undefined;
}

const MAX_CART_QUANTITY = 50;

export default function ProductCard({
  product,
  cartQuantity,
  cartId,
}: ProductCardProps) {
  const showError = useShowError();
  const [isCarting, setIsCarting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const {refetch} = useApi(getCartProduct, 'cartItems');

  const handlePutCartClick = async () => {
    if (!isCarting) {
      setIsCarting(true);
      return;
    }

    if (cartQuantity >= MAX_CART_QUANTITY) {
      showError?.(
        `장바구니에 담을 수 있는 최대 개수는 ${MAX_CART_QUANTITY}개입니다.`
      );
      return;
    }

    if (product.quantity < quantity) {
      showError?.(
        `장바구니에 현재 재고 ${product.quantity}개를 초과하여 담을 수 없습니다.`
      );
      return;
    }

    try {
      await postCartProduct(product.id, quantity);
      refetch();
      setQuantity(1);
    } catch (e) {
      showError?.('상품 추가 중에 문제가 발생했습니다.');
    }
    setIsCarting(false);
  };

  const handleDeleteCartClick = async () => {
    if (cartId)
      try {
        await deleteCartProduct(cartId);
        refetch();
      } catch (e) {
        showError?.('삭제하는 중에 문제가 발생했습니다.');
      }
  };

  const iconUrl = cartId ? './deleteCartIcon.svg' : './addCartIcon.svg';
  const title = cartId ? '빼기' : '담기';
  const className = cartId
    ? css`
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
      `
    : css``;
  const handleCartClick = cartId ? handleDeleteCartClick : handlePutCartClick;

  return (
    <S.ProductCardContainer>
      <S.ImageSection>
        <S.Image
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => (e.currentTarget.src = './emptyImage.jpg')}
        />
        {product.quantity === 0 && <S.SoldOut>품절</S.SoldOut>}
      </S.ImageSection>

      <S.ContentSection>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductCategory>{product.category}</S.ProductCategory>
        <S.ProductPrice>{formatPrice(product.price)}원</S.ProductPrice>
        {product.quantity !== undefined && (
          <S.ProductQuantity>수량: {product.quantity}개</S.ProductQuantity>
        )}
      </S.ContentSection>

      <S.ButtonSection isCarting={isCarting}>
        {isCarting && (
          <CartCount
            count={quantity}
            onPlusCount={() => setQuantity((prev) => prev + 1)}
            onMinusCount={() => {
              quantity > 0 && setQuantity((prev) => prev - 1);
            }}
          />
        )}
        <CustomButton
          iconUrl={iconUrl}
          title={title}
          onClick={handleCartClick}
          css={className}
        />
      </S.ButtonSection>
    </S.ProductCardContainer>
  );
}
