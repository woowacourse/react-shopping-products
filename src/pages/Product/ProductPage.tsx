import { getCartItems } from "@/apis/cartItems/getCartItems";
import LoadingFallback from "@/components/Fallback/LoadingFallback";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import ProductContent from "@/components/Product/Content";
import ProductItem from "@/components/Product/Content/List/Item";
import RemoveCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Remove";
import useData from "@/hooks/useData";
import { CartItemType } from "@/types/cartItem";
import styled from "@emotion/styled";
import { useState } from "react";

function ProductPage() {
  const { data: cartItemData, isLoading } = useData<CartItemType[]>({
    fetchFn: getCartItems,
    name: "cartItemData",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const price = cartItemData?.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0
  );

  if (isLoading || !cartItemData)
    return <LoadingFallback message="로딩 중입니다..." />;
  return (
    <>
      <Header quantity={cartItemData.length} onClick={handleClick} />
      <ProductContent />
      {isOpen && (
        <Modal position="bottom" isOpen={isOpen} onClose={handleClick}>
          <Modal.Title>장바구니</Modal.Title>

          <ItemContent>
            {cartItemData.map((item) => (
              <ItemWrapper key={item.id}>
                <ProductItem
                  product={item.product}
                  variant="cart"
                ></ProductItem>
                <ButtonWrapper>
                  <RemoveCartItemButton id={item.id}></RemoveCartItemButton>
                </ButtonWrapper>
              </ItemWrapper>
            ))}
          </ItemContent>
          <PriceWrapper>
            <Modal.Title>총 결제 금액</Modal.Title>

            <Modal.Title>{price}원</Modal.Title>
          </PriceWrapper>

          <CloseButton onClick={handleClick}>닫기</CloseButton>
        </Modal>
      )}
    </>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  border-top: 1px solid #eaeaea;
  padding: 20px 0px;
  align-items: stretch;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #333333;
  color: white;
  border: none;
  cursor: pointer;
`;

export default ProductPage;
