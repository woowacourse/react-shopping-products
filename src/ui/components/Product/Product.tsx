import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName,
  CartButton,
  CartButtonImg,
  CartButtonText,
} from './Product.styles';
import { useState } from 'react';

interface ProductProps {
  key: number;
  name: string;
  price: number;
  imgSrc?: string;
}

function Product({ name, price, imgSrc }: ProductProps) {
  const [inCart, setInCart] = useState(false);

  const handleToggle = () => setInCart((prev) => !prev);

  const buttonImg = inCart
    ? './remove_shopping_cart.png'
    : './add_shopping_cart.png';

  const buttonText = inCart ? '빼기' : '담기';

  return (
    <Container>
      <ProductImageContainer>
        <ProductImage src={imgSrc} alt={name} />
      </ProductImageContainer>
      <Detail>
        <ProductName>{name}</ProductName>
        <Price>{price}</Price>
      </Detail>
      <CartButton inCart={inCart} onClick={handleToggle}>
        <CartButtonImg src={buttonImg} alt={buttonText} />
        <CartButtonText inCart={inCart}>{buttonText}</CartButtonText>
      </CartButton>
    </Container>
  );
}

export default Product;
