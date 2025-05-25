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
  // SoldoutBakcgound,
  // SoldOutText,
} from './Product.styles';
import { ProductElement } from '../../../types/type';
import { useCartListContext } from '../../../context/CartContext';
import QuantityController from '../QuantityController/QuantityController';

interface ProductProps {
  item: ProductElement;
  // refetch: () => void;
}

function Product({ item }: ProductProps) {
  const { name, price, imageUrl, quantity } = item;

  const {
    cartList,
    handleAddCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveCart,
  } = useCartListContext();

  const cartItem = cartList.find((cartItem) => cartItem.product.id === item.id);

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
