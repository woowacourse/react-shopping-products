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

interface ProductProps {
  item: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    isInCart: boolean;
  };
  onAddCart: (id: number) => void;
  onRemoveCart: (id: number) => void;
}

function Product({ item, onAddCart, onRemoveCart }: ProductProps) {
  const { id, name, price, imageUrl, isInCart } = item;

  return (
    <Container>
      <ProductImageContainer>
        <ProductImage src={imageUrl} alt={name} />
      </ProductImageContainer>
      <Detail>
        <ProductName>{name}</ProductName>
        <Price>{`${price.toLocaleString()}원`}</Price>
      </Detail>
      {isInCart ? (
        <RemoveButton onClick={() => onAddCart(id)} />
      ) : (
        <AddButton onClick={() => onRemoveCart(id)} />
      )}
    </Container>
  );
}

export default Product;
