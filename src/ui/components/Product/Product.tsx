import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName,
} from './Product.styles';
import { ProductElement } from '../../../types/type';
import { useCartListContext } from '../../../context/CartContext';
import QuantityController from '../QuantityController/QuantityController';

interface ProductProps {
  item: ProductElement;
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function Product({ item, onAddCart, onRemoveCart }: ProductProps) {
  const { name, price, imageUrl } = item;

  const { cartList } = useCartListContext();
  // const isInCart = cartList.some((cartItem) => cartItem.product.id === item.id);
  const cartItem = cartList.find((cartItem) => cartItem.product.id === item.id);

  return (
    <Container>
      <ProductImageContainer>
        <ProductImage src={imageUrl} alt={name} />
      </ProductImageContainer>
      <Detail>
        <ProductName>{name}</ProductName>
        <Price>{`${price.toLocaleString()}원`}</Price>
      </Detail>
      {cartItem ? (
        // <RemoveButton onClick={() => onRemoveCart(item)} />
        <QuantityController quantity={cartItem.quantity} />
      ) : (
        <AddButton onClick={() => onAddCart(item)} />
      )}
    </Container>
  );
}

export default Product;
