import { Product, CartItem } from "../../types/productType";
import CartActionButton from "./button/CartActionButton";
import styled from "@emotion/styled";
import QuantityAdjuster from "./QuantityAdjuster";
import { useAPIData } from "../../contexts/DataContext";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "./nullImage.png";
};

const ProductItem = ({
  product,
  addToCart,
  isInCart,
}: {
  product: Product;
  isInCart: boolean;
  addToCart: (product: Product) => void;
}) => {
  const handleProductAddClick = () => addToCart(product);
  const cartData = useAPIData<{ data: { content: CartItem[] } }>("cartItems");
  const cartItems = cartData?.data?.content || [];
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <>
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
              <QuantityAdjuster count={quantity} />
            ) : (
              <CartActionButton variant="add" onClick={handleProductAddClick} />
            )}
          </ButtonContainer>
        </ProductItemInfoContainer>
      </ProductItemContainer>
    </>
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
  align-items: center;
  gap: 10px;
`;
