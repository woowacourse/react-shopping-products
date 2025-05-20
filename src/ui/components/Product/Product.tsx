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
import { ProductWithCartInfo } from '../../../types/product';

interface ProductProps {
  item: ProductWithCartInfo;
  onAddCart: (product: ProductWithCartInfo) => Promise<void>;
  onRemoveCart: (product: ProductWithCartInfo) => Promise<void>;
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
        <RemoveButton onClick={() => onRemoveCart(item)} />
      ) : (
        <AddButton onClick={() => onAddCart(item)} />
      )}
    </Container>
  );
}

export default Product;
