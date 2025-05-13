import {
  Container,
  ProductImage,
  Detail,
  Price,
  ProductName,
  CartButton,
  CartButtonImg,
  CartButtonText,
} from './Product.styles';

interface ProductProps {
  key: number;
  name: string;
  price: number;
  imgSrc?: string;
}

function Product({ name, price, imgSrc }: ProductProps) {
  return (
    <Container>
      <ProductImage src={imgSrc} alt={name} />
      <Detail>
        <ProductName>{name}</ProductName>
        <Price>{price}</Price>
      </Detail>
      <CartButton>
        <CartButtonImg src="./add_shopping_cart.png" alt="쇼핑카트" />
        <CartButtonText>담기</CartButtonText>
      </CartButton>
    </Container>
  );
}

export default Product;
