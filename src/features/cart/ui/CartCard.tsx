import {useState} from 'react';
import CustomButton from '../../../shared/ui/CustomButton';
import * as S from './CartCard.styles';
import CartCount from './CartCount';
import {Product} from '../../products/type/product';
import {deleteCartProduct} from '../api/deleteCartProduct';
import {useShowError} from '../../../shared/provider/errorProvider';
import {useApi} from '../../products/provider/apiProvider';
import {getCartProduct} from '../api/getCartProduct';
import {formatPrice} from '../../../shared/utils/formatPrice';
import {updateCartProduct} from '../api/updateCartProduct';

type Props = {
  cartId: number;
  product: Product;
  quantity: number;
};

export default function CartCard({cartId, product, quantity}: Props) {
  const [count, setCount] = useState<number>(quantity);
  const showError = useShowError();

  const {refetch} = useApi(getCartProduct, 'cartItems');

  const handlePutCartClick = async () => {
    if (product.quantity < count) {
      showError?.(
        `장바구니에 현재 재고 ${product.quantity}개를 초과하여 담을 수 없습니다.`
      );
      return;
    }

    try {
      await updateCartProduct(cartId, count);
      refetch();
    } catch (e) {
      showError?.('상품 추가 중에 문제가 발생했습니다.');
    }
  };

  const handleDeleteCartClick = async () => {
    if (!cartId) return;
    try {
      await deleteCartProduct(cartId);
      refetch();
    } catch (e) {
      showError?.('삭제하는 중에 문제가 발생했습니다.');
    }
  };
  return (
    <>
      <S.CardContainer>
        <S.ImgSection
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => (e.currentTarget.src = './emptyImage.jpg')}
        />
        <S.ProductInfoSection>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{formatPrice(product.price)}원</S.ProductPrice>
          <CartCount
            count={count}
            onPlusCount={() => setCount((prev) => prev + 1)}
            onMinusCount={() => {
              quantity > 0 && setCount((prev) => prev - 1);
            }}
          />
        </S.ProductInfoSection>
        <S.ButtonSection>
          {quantity !== count && (
            <CustomButton title="담기" onClick={handlePutCartClick} />
          )}
          <CustomButton title="빼기" onClick={handleDeleteCartClick} />
        </S.ButtonSection>
      </S.CardContainer>
      <S.Line />
    </>
  );
}
