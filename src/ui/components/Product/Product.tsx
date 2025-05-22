import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import {
  Container,
  ProductImageContainer,
  ProductImage,
  Detail,
  Price,
  ProductName, ImageContainer, EmptyImage,
} from './Product.styles';
import { ProductElement } from '../../../types/product';
import { woowaLogo } from "../../../assets";

interface ProductProps {
  item: ProductElement;
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function Product({ item, onAddCart, onRemoveCart }: ProductProps) {
  const { name, price, imageUrl, isInCart } = item;

  // console.log('item', item);

  const isImage = imageUrl.length > 15

  return (
    <Container>
      <ProductImageContainer>
        {isImage ?
          <ProductImage src={imageUrl} alt={name}/>
          : (
            <ImageContainer>
              <EmptyImage src={woowaLogo} alt={name}/>
              <p>이미지가 없습니다</p>
            </ImageContainer>
          )
        }
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
