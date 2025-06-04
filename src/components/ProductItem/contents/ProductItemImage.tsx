import styled from '@emotion/styled';
import { Product } from '../../../App';
import isValidImageUrl from '../../../utils/isValidImageUrl';

type ProductItemProps = {
  product: Product;
  height?: string;
  width?: string;
};
type ImageEvent = React.SyntheticEvent<HTMLImageElement>;

const ProductItemImage = ({ product, height, width }: ProductItemProps) => {
  return (
    <StyledProductItemImage
      src={
        isValidImageUrl(product.imageUrl) ? product.imageUrl : 'fallback.svg'
      }
      alt={product.name}
      onError={(e: ImageEvent) => {
        e.currentTarget.src = 'fallback.svg';
      }}
      height={height}
      width={width}
    />
  );
};

export default ProductItemImage;

type StyledProductItemImageProps = {
  height?: string;
  width?: string;
};

const StyledProductItemImage = styled.img<StyledProductItemImageProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  border-radius: 8px 8px 0px 0px;
  min-height: ${({ height }) => height || '100%'};
  min-width: ${({ width }) => width || '100%'};
`;
