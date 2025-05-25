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
  patchQuantity,
}: {
  product: Product;
  addToCart: (product: Product) => void;
  patchQuantity: (id: number, quantity: number) => void;
}) => {
  const handleProductAddClick = () => addToCart(product);
  const cartData = useAPIData<{ data: { content: CartItem[] } }>("cartItems");
  const cartItems = cartData?.data?.content || [];
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <>
      <ProductItemContainer>
        <ProductItemWrapper>
          <ProductItemImage
            src={product.imageUrl}
            alt={product.name}
            quantity={product.quantity ?? 0}
            onError={handleImageError}
          />
          {product.quantity === 0 && <SoldOutText>품절</SoldOutText>}
        </ProductItemWrapper>

        <ProductItemInfoContainer>
          <TextContainer>
            <ProductItemName>{product.name}</ProductItemName>
            <ProductItemPrice>
              {product.price.toLocaleString()}원
            </ProductItemPrice>
          </TextContainer>

          <ButtonContainer>
            {cartItem ? (
              <QuantityAdjuster
                count={quantity}
                onDecreaseClick={() => {
                  patchQuantity(cartItem.id, quantity - 1);
                }}
                onIncreaseClick={() => {
                  patchQuantity(cartItem.id, quantity + 1);
                }}
              />
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

const ProductItemWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px 8px 0px 0px;
  overflow: hidden;
`;

const ProductItemImage = styled.img<{ quantity: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${({ quantity }) => (quantity === 0 ? "brightness(0.5)" : "none")};
`;

const SoldOutText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 35px;
  font-weight: 600;
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
