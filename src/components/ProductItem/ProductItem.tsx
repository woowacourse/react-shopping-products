import * as S from './ProductItem.styled';
import AddProductIcon from '../Icon/AddProductIcon';
import Button from '../common/Button/Button';
import blackDefaultImage from '../../assets/blackDefaultImage.png';
import QuantityButton from '../QuantityButton/QuantityButton';
import { ResponseProduct } from '../../api/types';
import { useProductItem } from './hooks/useProductItem';

function ProductItem({ product }: { product: ResponseProduct }) {
  const { quantity, isInCart, text, keyword, handleProductItem } = useProductItem(product.id);

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
        {isInCart ? (
          <QuantityButton
            quantity={quantity!}
            handleAddQuantity={() => handleProductItem('update', product.id, quantity! + 1)}
            handleSubtractQuantity={() => handleProductItem('update', product.id, quantity! - 1)}
          />
        ) : (
          <Button keyWord={keyword} onClick={() => handleProductItem('add', product.id)}>
            <AddProductIcon />
            {text}
          </Button>
        )}
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
