import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName,
  // SoldoutBakcgound,
  // SoldOutText,
} from './Product.styles';
import { ProductElement } from '../../../types/type';
import { useCartListContext } from '../../../context/CartContext';
import QuantityController from '../QuantityController/QuantityController';

interface ProductProps {
  item: ProductElement;
}

function Product({ item }: ProductProps) {
  const { name, price, imageUrl } = item;

  const { cartList, handleAddCart, handleRemoveCart } = useCartListContext();

  const cartItem = cartList.find((cartItem) => cartItem.product.id === item.id);

  return (
    <Container>
      <ProductImageContainer>
        <ProductImage src={imageUrl} alt={name} />
        {/* <SoldoutBakcgound>
          <SoldOutText>품절</SoldOutText>
        </SoldoutBakcgound> */}
      </ProductImageContainer>
      <Detail>
        <ProductName>{name}</ProductName>
        <Price>{`${price.toLocaleString()}원`}</Price>
      </Detail>
      {cartItem ? (
        cartItem.quantity >= 1 ? (
          <QuantityController
            position="end"
            quantity={cartItem.quantity}
            onAddClick={() => handleAddCart(item)}
            onRemoveClick={() => handleRemoveCart(item)}
          />
        ) : (
          <RemoveButton onClick={() => handleRemoveCart(item)} />
        )
      ) : (
        <AddButton onClick={() => handleAddCart(item)} />
      )}
    </Container>
  );
}

export default Product;
