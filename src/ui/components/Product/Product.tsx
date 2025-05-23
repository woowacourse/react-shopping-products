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
  // onAddCart: (product: ProductElement) => Promise<void>;
  // onRemoveCart: (product: ProductElement) => Promise<void>;
}

function Product({ item }: ProductProps) {
  const { name, price, imageUrl } = item;

  const {
    cartList,
    handleAddCart,
    // handleIncreaseQuantity,
    // handleDecreaseQuantity,
    handleRemoveCart,
  } = useCartListContext();
  // console.log('cartList', cartList);
  // const isInCart = cartList.some((cartItem) => cartItem.product.id === item.id);
  const cartItem = cartList.find((cartItem) => cartItem.product.id === item.id);

  // console.log(cartItem);

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
        cartItem.quantity >= 1 ? (
          <QuantityController
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
