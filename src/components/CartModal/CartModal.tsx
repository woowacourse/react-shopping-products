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
  console.log("Cart Items:", cartItemInfo);
  const content = (
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
  );

  return (
    <Modal
      title="장바구니"
      position="bottom"
      size="small"
      content={content}
      onClose={onClose}
    />
  );
};

export default CartModal;

export const CartContent = styled.div`
  max-height: 400px;
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
