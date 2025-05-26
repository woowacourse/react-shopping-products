import AddButton from './AddButton';
import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName,
  SoldoutBakcgound,
  SoldOutText,
} from './Product.styles';
import { CartItem, ProductElement } from '../../../types/type';
import QuantityController from '../QuantityController/QuantityController';
import { useCartActions } from '../../../hooks/useCartAction';
import { useCallback } from 'react';
import { getCartItem } from '../../../api/fetchCart';
import { useAPI } from '../../../hooks/useAPI';

interface ProductProps {
  item: ProductElement;
}

function Product({ item }: ProductProps) {
  const { name, price, imageUrl, quantity } = item;

  const fetchCartItems = useCallback(async () => {
    return await getCartItem({ page: 0, size: 50, sortBy: 'desc' }).then(
      (res) => res.content
    );
  }, []);

  const { data: cartList } = useAPI<CartItem[]>({
    fetcher: fetchCartItems,
    name: 'cartItems',
  });

  const {
    handleAddCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveCart,
  } = useCartActions();

  const cartItem = cartList?.find(
    (cartItem) => cartItem.product.id === item.id
  );

  return (
    <Container>
      <ProductImageContainer>
        <ProductImage src={imageUrl} alt={name} />
        {quantity === 0 && (
          <SoldoutBakcgound>
            <SoldOutText>품절</SoldOutText>
          </SoldoutBakcgound>
        )}
      </ProductImageContainer>
      <Detail>
        <ProductName>{name}</ProductName>
        <Price>{`${price.toLocaleString()}원`}</Price>
      </Detail>
      {cartItem && cartItem.quantity >= 1 ? (
        <QuantityController
          position="end"
          quantity={cartItem.quantity}
          onIncreaseClick={() => handleIncreaseQuantity(item)}
          onDecreaseClick={() => handleDecreaseQuantity(item)}
          onRemoveClick={() => handleRemoveCart(item)}
        />
      ) : (
        <AddButton onClick={() => handleAddCart(item)} isDisable={!quantity} />
      )}
    </Container>
  );
}

export default Product;
