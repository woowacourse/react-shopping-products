import { Product } from "../../types/productType";
import CartActionButton from "./button/CartActionButton";
import styled from "@emotion/styled";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "./nullImage.png";
};

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
  const handleProductAddClick = () => addToCart(product);
  const handleProductRemoveClick = () => removeFromCart(product.id);

  return (
    <ProductItemContainer>
      <ProductItemImage
        src={product.imageUrl}
        alt={product.name}
        onError={handleImageError}
      />
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
              onClick={handleProductRemoveClick}
            />
          ) : (
            <CartActionButton variant="add" onClick={handleProductAddClick} />
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
