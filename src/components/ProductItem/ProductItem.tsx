import * as S from './ProductItem.styled';
import AddProductIcon from '../Icon/AddProductIcon';
import Button from '../common/Button/Button';
import RemoveProductIcon from '../Icon/RemoveProductIcon';
import { cartApi } from '../../api/cartApi';
import blackDefaultImage from '../../assets/blackDefaultImage.png';
import { ResponseProduct } from '../../api/types';
import { Dispatch, SetStateAction } from 'react';
import { CART_MAX_COUNT } from '../../constants/constants';
import { getCartItemId, isItemInCart } from './utils';
import { useCartItemList } from '../../pages/productListPage/context/useCartContext';

function ProductItem({ product, setErrorMessage }: { product: ResponseProduct; setErrorMessage: Dispatch<SetStateAction<string>> }) {
  const { cartItemList, setCartItemList } = useCartItemList();
  const { isInCart, text, keyword } = isItemInCart(product.id, cartItemList);

  async function handleProductItem(action: string, productId: number) {
    try {
      if (action === 'remove') {
        const cartItemId = getCartItemId(productId, cartItemList);
        if (cartItemId) {
          await cartApi.delete(cartItemId);
        }
      } else {
        if (cartItemList.length >= CART_MAX_COUNT) {
          setErrorMessage('장바구니에는 최대 50개의 상품만 담을 수 있습니다.');
          return;
        }
        await cartApi.post(productId, 1);
      }

      const rawCartItemList = await cartApi.get();
      setCartItemList(rawCartItemList);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }
  return (
    <S.ProductItemContainer>
      <S.ProductItemImage
        src={product.imageUrl}
        alt={product.name}
        onError={(e) => {
          e.currentTarget.src = blackDefaultImage;
          e.currentTarget.onerror = null;
        }}
      />
      <S.ProductItemBottom>
        <S.ProductItemDetailBox>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.ProductItemDetailBox>
        <Button
          keyWord={keyword}
          onClick={() => {
            isInCart ? handleProductItem('remove', product.id) : handleProductItem('add', product.id);
          }}
        >
          {isInCart ? <RemoveProductIcon /> : <AddProductIcon />}
          {text}
        </Button>
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
