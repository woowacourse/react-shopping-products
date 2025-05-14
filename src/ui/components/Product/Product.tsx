import { addCart, removeCart } from '../../../api/cart';
import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName,
} from './Product.styles';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import { useState } from 'react';

interface ProductProps {
  key: number;
  id: number;
  name: string;
  price: number;
  imgSrc?: string;
  isInCart: boolean;
}

function Product({ id, name, price, imgSrc, isInCart, cart }: ProductProps) {
  const [inCart, setInCart] = useState(false);

  const handleAddCart = async () => {
    await addCart(id, price);
    setInCart(true);
  };

  const handleRemoveCart = async () => {
    if (cart) {
      const cartId = cart.cart.content.filter((item) => item.product.id === id);
      console.log('cart id:', cartId);
      await removeCart(cartId[0].id);
      setInCart(false);
    }
  };

  return (
    <Container>
      <ProductImageContainer>
        <ProductImage src={imgSrc} alt={name} />
      </ProductImageContainer>
      <Detail>
        <ProductName>{name}</ProductName>
        <Price>{price}</Price>
      </Detail>
      {isInCart ? (
        <RemoveButton onClick={handleRemoveCart} />
      ) : (
        <AddButton onClick={handleAddCart} />
      )}
    </Container>
  );
}

export default Product;
