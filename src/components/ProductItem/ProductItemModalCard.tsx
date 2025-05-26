import { Product } from '../../App';
import QuantityStepper from './button/QuantityStepper';
import styled from '@emotion/styled';
import ProductItemImage from './contents/ProductItemImage';
import ProductItemInfo from './contents/ProductItemInfo';
import Flex from '../commons/Flex';

type ProductItemProps = {
  product: Product;
};

const ProductItemModalCard = ({ product }: ProductItemProps) => {
  return (
    <ProductItemContainer>
      <Flex flexDirection="row">
        <ProductItemImage product={product} height="90px" width="90px" />

        <Flex flexDirection="column" justifyContent="space-between">
          <ProductItemInfo product={product} />

          <QuantityStepper product={product} />
        </Flex>
      </Flex>
    </ProductItemContainer>
  );
};

export default ProductItemModalCard;

const ProductItemContainer = styled.div`
  height: 90px;
  border-radius: 8px;
  position: relative;
  margin-bottom: 12px;
`;
