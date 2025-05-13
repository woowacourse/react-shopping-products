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
  name: string;
  price: string;
  imgSrc?: string;
}

function Product({ name, price, imgSrc }: ProductProps) {
  return (
    <Container>
      {/* <Image src={imgSrc} alt={name} /> */}
      <ProductImage
        src="https://img.danawa.com/prod_img/500000/471/914/img/12914471_1.jpg?_v=20220324105614"
        alt={name}
      />
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
