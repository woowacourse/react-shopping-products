import * as S from './ProductItem.styled';
import AddProductIcon from '../Icon/AddProductIcon';
import { ResponseCartItem, ResponseProduct } from '../../api/types';
import Button from '../common/Button/Button';
import RemoveProductIcon from '../Icon/RemoveProductIcon';
import AddProductItemApi from '../../api/AddProductItemApi';
import RemoveProductItemApi from '../../api/RemoveProductItemApi';
import getCartItemList from '../../api/CartItemListApi';
import { Dispatch, SetStateAction } from 'react';

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
  function getCartItemId(productId: number) {
    const cartItem = cartItemList.find((item) => item.product.id === productId);
    return cartItem?.id;
  }

  async function handleProductItem(action: string, product: ResponseProduct) {
    try {
      if (action === 'remove') {
        const cartItemId = getCartItemId(product.id);
        if (cartItemId) {
          await RemoveProductItemApi(cartItemId);
        }
      } else {
        await AddProductItemApi(product.id, 1);
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
      <S.ProductItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductItemBottom>
        <S.ProductItemDetailBox>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.ProductItemDetailBox>
        <Button
          text={cartItemList.some((item) => item.product.id === product.id) ? '삭제' : '담기'}
          icon={cartItemList.some((item) => item.product.id === product.id) ? <RemoveProductIcon /> : <AddProductIcon />}
          keyWord={cartItemList.some((item) => item.product.id === product.id) ? 'remove' : 'add'}
          onClick={() => {
            cartItemList.some((item) => item.product.id === product.id) ? handleProductItem('remove', product) : handleProductItem('add', product);
          }}
        />
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
