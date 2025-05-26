import styled from '@emotion/styled';

const ProductItemSoldOut = () => {
  return <StyleProductItemSoldOut>품절</StyleProductItemSoldOut>;
};

export default ProductItemSoldOut;

const StyleProductItemSoldOut = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  border-radius: 8px 8px 0px 0px;
}`;
