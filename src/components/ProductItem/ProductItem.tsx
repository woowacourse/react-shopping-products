import * as S from './ProductItem.styled';
import AddProductIcon from '../Icon/AddProductIcon';
import { ResponseProduct } from '../../api/types';
import Button from '../common/Button/Button';
import RemoveProductIcon from '../Icon/RemoveProductIcon';

function ProductItem({ product }: { product: ResponseProduct }) {
  return (
    <S.ProductItemContainer>
      <S.ProductItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductItemBottom>
        <S.ProductItemDetailBox>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.ProductItemDetailBox>
        <Button
          text={product.isInCart ? '빼기' : '담기'}
          icon={product.isInCart ? <RemoveProductIcon /> : <AddProductIcon />}
          keyWord={product.isInCart ? 'remove' : 'add'}
        />
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
