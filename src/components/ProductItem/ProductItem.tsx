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
      <S.ProductItemImageContainer>
        <S.ProductItemImage
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = blackDefaultImage;
            e.currentTarget.onerror = null;
          }}
        />
        {product.quantity == 0 && (
          <S.NoProductItem>
            <S.NoProductItemText>품절</S.NoProductItemText>
          </S.NoProductItem>
        )}
      </S.ProductItemImageContainer>
      <S.ProductItemBottom>
        <S.ProductItemDetailBox>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.ProductItemDetailBox>
        {product.quantity! > 0 &&
          (isInCart ? (
            <QuantityButton
              quantity={quantity!}
              maxStock={product.quantity!}
              handleAddQuantity={() => handleProductItem('update', product.id, quantity! + 1)}
              handleSubtractQuantity={() => handleProductItem('update', product.id, quantity! - 1)}
            />
          ) : (
            <Button keyWord={keyword} onClick={() => handleProductItem('add', product.id)}>
              <AddProductIcon />
              {text}
            </Button>
          ))}
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
