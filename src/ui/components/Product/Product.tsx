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
import { ProductElement } from '../../../types/product';

interface ProductProps {
  item: ProductElement;
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function Product({ item, onAddCart, onRemoveCart }: ProductProps) {
  const { name, price, imageUrl, isInCart } = item;

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
        <RemoveButton onClick={() => onAddCart(item)} />
      ) : (
        <AddButton onClick={() => onRemoveCart(item)} />
      )}
    </Container>
  );
}

export default Product;
