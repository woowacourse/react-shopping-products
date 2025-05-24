import { DELETE_BUTTON_TEXT } from '../../../constants/shopInfoConfig';
import { useCartListContext } from '../../../context/CartContext';
import { CartItem, ProductElement } from '../../../types/type';
import QuantityController from '../QuantityController/QuantityController';
import {
  ButtonContainer,
  ButtonText,
  Image,
  ImageContainer,
  Info,
  PriceText,
  Product,
  Title,
} from './CartItemRow.styles';

interface CartItemRowProps {
  item: CartItem;
}

function CartItemRow({ item }: CartItemRowProps) {
  const { product, quantity } = item;
  const { name, price, imageUrl } = product;

  const { handleIncreaseQuantity, handleDecreaseQuantity, handleRemoveCart } =
    useCartListContext();
  console.log(item);
  return (
    <Product>
      <ImageContainer>
        <Image src={imageUrl} alt={name} />
      </ImageContainer>
      <Info>
        <Title>{name}</Title>
        <PriceText>{price.toLocaleString()}원</PriceText>
        <QuantityController
          position="start"
          quantity={quantity}
          onIncreaseClick={() => handleIncreaseQuantity(product)}
          onDecreaseClick={() => handleDecreaseQuantity(product)}
          onRemoveClick={() => handleRemoveCart(product)}
        />
      </Info>
      <ButtonContainer>
        <ButtonText onClick={() => handleRemoveCart(product)}>
          {DELETE_BUTTON_TEXT}
        </ButtonText>
      </ButtonContainer>
    </Product>
  );
}

export default CartItemRow;
