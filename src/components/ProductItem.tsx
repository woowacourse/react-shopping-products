import styled from '@emotion/styled';
import Button from './Button';
import { ProductItemType } from '../types/data';
import AddShoppingCartIcon from '/public/icon/add-shopping-cart.svg';
import RemoveShoppingCartIcon from '/public/icon/remove-shopping-cart.svg';
import { useState } from 'react';

interface ProductItemProps {
  product: ProductItemType;
  isCartAdded: boolean;
  handleAddCartItem: (id: number, quantity: number) => void;
  handleRemoveCartItem: (id: number) => void;
}

const ProductItem = ({
  product,
  isCartAdded,
  handleAddCartItem,
  handleRemoveCartItem,
}: ProductItemProps) => {
  const DEFAULT_PRODUCT_IMAGE = './default-product.png';

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
  };

  const [quantity, setQuantity] = useState(0);

  return (
    <ProductItemContainer>
      <ProductItemImage src={product.imageUrl} alt={product.name} onError={handleImageError} />
      <ProductItemCard>
        <ProductItemInfo>
          <ProductItemTitle>{product.name}</ProductItemTitle>
          <ProductItemPrice>{product.price.toLocaleString()}원</ProductItemPrice>
        </ProductItemInfo>

        {isCartAdded ? (
          <Button
            type="button"
            id="remove"
            name="빼기"
            variant="smallGrey"
            onClick={() => handleRemoveCartItem(product.id)}
          >
            <CartIconContainer>
              <CartAddIcon src={RemoveShoppingCartIcon} alt="장바구니 빼기" />
              빼기
            </CartIconContainer>
          </Button>
        ) : (
          <Button
            type="button"
            id="add"
            name="담기"
            variant="smallBlack"
            onClick={() => handleAddCartItem(product.id, 3)}
          >
            <CartIconContainer>
              <CartAddIcon src={AddShoppingCartIcon} alt="장바구니 담기" />
              담기
            </CartIconContainer>
            <Button
              type="button"
              id="add"
              name="추가"
              variant="smallBlack"
              onClick={() => handleAddCartItem(product.id, 3)}
            >
              {quantity}
            </Button>
          </Button>
        )}
      </ProductItemCard>
    </ProductItemContainer>
  );
};

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 182px;
  width: 100%;
  gap: 8px;
  border-radius: 8px;
  background-color: var(--color-white);
`;

const ProductItemImage = styled.img`
  height: 50%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const ProductItemCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
  margin: 8px;
  align-items: end;
`;

const ProductItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 6px;
  width: 100%;
`;

const ProductItemTitle = styled.span`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
  width: 100%;
  text-align: start;
`;

const ProductItemPrice = styled.span`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
  width: 100%;
`;

const CartIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
`;

const CartAddIcon = styled.img`
  width: 16px;
`;

export default ProductItem;
