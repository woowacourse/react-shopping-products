import AddButton from './AddButton';
import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName,
  SoldoutBackground,
  SoldOutText,
} from './Product.styles';
import { CartItem, ProductElement } from '../../../types/type';
import QuantityController from '../QuantityController/QuantityController';
import { useCartActions } from '../../../hooks/useCartAction';
import { useAPI } from '../../../hooks/useAPI';
import { fetchCartItem } from '../../../utils/getCartItem';
import { SHOP_INFO } from '../../../constants/shopInfoConfig';
import { API_CONFIG } from '../../../constants/APIConfig';

interface ProductProps {
  item: ProductElement;
}

function Product({ item }: ProductProps) {
  const { name, price, imageUrl, quantity } = item;

  const { data: cartList } = useAPI<CartItem[]>({
    fetcher: fetchCartItem,
    name: API_CONFIG.CART_NAME,
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
          <SoldoutBackground>
            <SoldOutText>{SHOP_INFO.SOLD_OUT_TEXT}</SoldOutText>
          </SoldoutBackground>
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
