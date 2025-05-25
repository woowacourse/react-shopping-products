import { Product } from '../../App';
import QuantityStepper from './button/QuantityStepper';
import styled from '@emotion/styled';
import ProductItemImage from './contents/ProductItemImage';
import ProductItemInfo from './contents/ProductItemInfo';
import AddCartItemButton from './button/AddCartItemButton';
import Flex from '../commons/Flex';
import ProductItemSoldOut from './contents/ProductItemSoldOut';

type ProductItemProps = {
  product: Product;
  cartItemQuantity: number;
  isInCart: boolean;
};

const ProductItemListCard = ({ product, isInCart }: ProductItemProps) => {
  return (
    <ProductItemContainer>
      <Flex flexDirection="column">
        {product.quantity === 0 && <ProductItemSoldOut />}
        <ProductItemImage product={product} height="50%" />

        <Flex
          flexDirection="column"
          justifyContent="space-between"
          height="50%"
          width="100%"
          style={{
            padding: '8px',
          }}
        >
          <ProductItemInfo product={product} />

          <ButtonContainer>
            {isInCart ? (
              <QuantityStepper product={product} />
            ) : (
              <AddCartItemButton product={product} />
            )}
          </ButtonContainer>
        </Flex>
      </Flex>
    </ProductItemContainer>
  );
};

export default ProductItemListCard;

const ProductItemContainer = styled.div`
  height: 240px;
  border-radius: 8px;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
