import { Product } from '../../App';
import AddToCardButton from '../AddToCardButton';
import RemoveFromCartButton from './RemoveFromCartButton';
import styled from '@emotion/styled';

const ProductItem = ({
  product,
  addToCart,
  isInCart,
  removeFromCart,
}: {
  product: Product;
  isInCart: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}) => {
  return (
    <ProductItemContainer>
      <ProductItemImage src={product.imageUrl} alt={product.name} />
      <ProductItemInfoContainer>
        <TextContainer>
          <ProductItemName>{product.name}</ProductItemName>
          <ProductItemPrice>
            {product.price.toLocaleString()}원
          </ProductItemPrice>
        </TextContainer>

        <ButtonContainer>
          {isInCart ? (
            <RemoveFromCartButton onClick={() => removeFromCart(product.id)} />
          ) : (
            <AddToCardButton onClick={() => addToCart(product)} />
          )}
        </ButtonContainer>
      </ProductItemInfoContainer>
    </ProductItemContainer>
  );
};

export default ProductItem;

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 240px;
  border-radius: 8px;
`;

const ProductItemInfoContainer = styled.div`
  height: 50%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductItemImage = styled.img`
  height: 50%;
  border-radius: 8px 8px 0px 0px;
`;
const ProductItemName = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const ProductItemPrice = styled.p`
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
