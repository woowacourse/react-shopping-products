import { SHOP_INFO } from '../../../constants/shopInfoConfig';
import { useCartActions } from '../../../hooks/useCartAction';
import { CartItem } from '../../../types/type';
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
    useCartActions();

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
          {SHOP_INFO.DELETE_BUTTON_TEXT}
        </ButtonText>
      </ButtonContainer>
    </Product>
  );
}

export default CartItemRow;
