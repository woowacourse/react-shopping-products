import * as S from './ProductItem.styled';
import AddProductIcon from '../Icon/AddProductIcon';
import Button from '../common/Button/Button';
import RemoveProductIcon from '../Icon/RemoveProductIcon';
import addProductItemApi from '../../api/addProductItemApi';
import removeProductItemApi from '../../api/removeProductItemApi';
import getCartItemList from '../../api/cartItemListApi';
import blackDefaultImage from '../../assets/blackDefaultImage.png';
import { ResponseCartItem, ResponseProduct } from '../../api/types';
import { Dispatch, SetStateAction } from 'react';
import { CART_MAX_COUNT } from '../../constants/constants';
import { getCartItemId, isItemInCart } from './utils';

function ProductItem({
  product,
  cartItemList,
  setCartItemList,
  setErrorMessage,
}: {
  product: ResponseProduct;
  cartItemList: ResponseCartItem[];
  setCartItemList: Dispatch<SetStateAction<ResponseCartItem[]>>;
  setErrorMessage: (message: string) => void;
}) {
  const { isInCart, text, keyword } = isItemInCart(product.id, cartItemList);

  async function handleProductItem(action: string, productId: number) {
    try {
      if (action === 'remove') {
        const cartItemId = getCartItemId(productId, cartItemList);
        if (cartItemId) {
          await removeProductItemApi(cartItemId);
        }
      } else {
        if (cartItemList.length >= CART_MAX_COUNT) {
          setErrorMessage('장바구니에는 최대 50개의 상품만 담을 수 있습니다.');
          return;
        }
        await addProductItemApi(productId, 1);
      }

      const rawCartItemList = await getCartItemList();
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
          {isInCart ? (
            <>
              <RemoveProductIcon />
              {text}
            </>
          ) : (
            <>
              <AddProductIcon />
              {text}
            </>
          )}
        </Button>
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
