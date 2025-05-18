import { Product } from "../../App";
import CartActionButton from "./button/CartActionButton";
import styled from "@emotion/styled";

function isValidUrl(url: string) {
  try {
    new URL(url);
    return url;
  } catch (_) {
    return "./nullImage.png";
  }
}

const ProductItem = ({
  product,
  addToCart,
  isInCart,
  removeFromCart,
}: {
  product: Product;
  isInCart: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}) => {
  return (
    <ProductItemContainer>
      <ProductItemImage src={isValidUrl(product.imageUrl)} alt={product.name} />
      <ProductItemInfoContainer>
        <TextContainer>
          <ProductItemName>{product.name}</ProductItemName>
          <ProductItemPrice>
            {product.price.toLocaleString()}원
          </ProductItemPrice>
        </TextContainer>

        <ButtonContainer>
          {isInCart ? (
            <CartActionButton
              variant="remove"
              onClick={() => removeFromCart(product.id)}
            />
          ) : (
            <CartActionButton
              variant="add"
              onClick={() => addToCart(product)}
            />
          )}
        </ButtonContainer>
      </ProductItemInfoContainer>
    </ProductItemContainer>
  );
};

export default ProductItem;

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 240px;
  border-radius: 8px;
`;

const ProductItemInfoContainer = styled.div`
  height: 50%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductItemImage = styled.img`
  height: 50%;
  border-radius: 8px 8px 0px 0px;
  object-fit: cover;
`;
const ProductItemName = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const ProductItemPrice = styled.p`
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
