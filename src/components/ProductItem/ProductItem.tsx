import { Product, CartItem } from "../../types/productType";
import CartActionButton from "./button/CartActionButton";
import styled from "@emotion/styled";
import QuantityAdjuster from "./QuantityAdjuster";
import { useAPI, useAPIData } from "../../hooks/useApi";
import getCartItems from "../../api/getCartItems";
import useCart from "../../hooks/useCart";
import { useContext } from "react";
import { APIContext } from "../../contexts/DataContext";
import { CART_ITEMS_KEY } from "../../constants/dataKey";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "./nullImage.png";
};

const ProductItem = ({ product }: { product: Product }) => {
  const cartData = useAPIData<{ data: { content: CartItem[] } }>(
    CART_ITEMS_KEY
  );
  const cartItems = cartData?.data?.content || [];
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const { setErrorMessage } = useContext(APIContext);

  const { refetch } = useAPI({
    fetcher: getCartItems,
    name: "cartItems",
  });
  const { patchQuantity, addToCart } = useCart({ setErrorMessage, refetch });

  const handleProductAddClick = () => addToCart(product, cartItems.length);
  const handleIncreaseQuantity = (id: number, quantity: number) =>
    patchQuantity(id, quantity);
  const handleDecreaseQuantity = (id: number, quantity: number) =>
    patchQuantity(id, quantity);

  return (
    <>
      <ProductItemContainer>
        <ProductItemWrapper>
          <ProductItemImage
            src={product.imageUrl}
            alt={product.name}
            quantity={product.quantity}
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
                  handleDecreaseQuantity(cartItem.id, quantity - 1);
                }}
                onIncreaseClick={() =>
                  handleIncreaseQuantity(cartItem.id, quantity + 1)
                }
                testId={product.id}
              />
            ) : (
              <CartActionButton
                variant="add"
                onClick={handleProductAddClick}
                testId={product.id}
              />
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

const ProductItemImage = styled.img<{ quantity: number | undefined }>`
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
