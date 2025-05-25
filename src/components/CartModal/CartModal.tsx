import { Products } from "../../apis/types/products";
import Modal from "../@common/Modal/Modal";
import styled from "@emotion/styled";
import QuantityController from "../QuantityController/QuantityController";

interface CartItemInfo {
  cartId: number;
  productId: number;
  quantity: number;
}

interface CartModalProps {
  onClose: () => void;
  cartItemInfo: CartItemInfo[];
  products: Products | null;
  onQuantityIncrease: (productId: number) => void;
  onQuantityDecrease: (productId: number) => void;
}

const CartModal = ({
  onClose,
  cartItemInfo,
  products,
  onQuantityDecrease,
  onQuantityIncrease,
}: CartModalProps) => {
  const productList = products?.content || [];

  const cartItems = cartItemInfo.map((cartItem) => {
    const product = productList.find((p) => p.id === cartItem.productId);
    return {
      cartId: cartItem.cartId,
      productId: cartItem.productId,
      cartQuantity: cartItem.quantity,
      name: product?.name,
      price: product?.price,
      imageUrl: product?.imageUrl,
      stockQuantity: product?.quantity,
    };
  });

  const totalPrice = cartItems.reduce((sum, item) => {
    const itemTotal = (item.price ?? 0) * item.cartQuantity;
    return sum + itemTotal;
  }, 0);

  const content = (
    <>
      <CartContent>
        {cartItems.length === 0 ? (
          <EmptyCart>장바구니가 비어있습니다.</EmptyCart>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item.cartId}>
              <ProductImage src={item.imageUrl} alt={item.name} />
              <ProductInfo>
                <ProductName>{item.name}</ProductName>
                <ProductPrice>{item.price?.toLocaleString()}원</ProductPrice>
                <QuantityController
                  stockQuantity={item.stockQuantity ?? 0}
                  cartQuantity={item.cartQuantity}
                  onIncrease={() => onQuantityIncrease(item.productId)}
                  onDecrease={() => onQuantityDecrease(item.productId)}
                />
              </ProductInfo>
            </CartItem>
          ))
        )}
      </CartContent>
      {cartItems.length > 0 && (
        <TotalPriceWrapper>
          총 결제 금액<TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
        </TotalPriceWrapper>
      )}
    </>
  );

  return (
    <Modal
      title="장바구니"
      position="bottom"
      size="small"
      content={content}
      onClose={onClose}
      buttonElements={[<CloseButton onClick={onClose}>닫기</CloseButton>]}
    />
  );
};

export default CartModal;

export const CartContent = styled.div`
  height: 340px;
  overflow-y: auto;
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;

  &:first-child {
    border-top: 1px solid #eee;
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProductName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

export const ProductPrice = styled.div`
  color: #333;
  margin-bottom: 4px;
`;

export const ProductQuantity = styled.div`
  color: #666;
  font-size: 14px;
`;

export const CloseButton = styled.button`
  background-color: #333333;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;
const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 12px;
`;

const TotalPrice = styled.span`
  margin-left: 8px;
  font-size: 20px;
`;
