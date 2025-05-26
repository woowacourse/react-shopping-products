import { getCartItems } from "@/apis/cartItems/getCartItems";
import LoadingFallback from "@/components/Fallback/LoadingFallback";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import ProductContent from "@/components/Product/Content";
import ProductItem from "@/components/Product/Content/List/Item";
import RemoveCartItemButton from "@/components/Product/Content/List/Item/CardItemButton/Remove";
import useData from "@/hooks/useData";
import { CartItemType } from "@/types/cartItem";
import { useState } from "react";
import * as S from "./ProductPage.styled";

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

          <S.ItemContent>
            {cartItemData.map((item) => (
              <S.ItemWrapper key={item.id}>
                <ProductItem
                  product={item.product}
                  variant="cart"
                ></ProductItem>
                <S.ButtonWrapper>
                  <RemoveCartItemButton id={item.id}></RemoveCartItemButton>
                </S.ButtonWrapper>
              </S.ItemWrapper>
            ))}
          </S.ItemContent>
          <S.PriceWrapper>
            <Modal.Title>총 결제 금액</Modal.Title>
            <Modal.Title>{price}원</Modal.Title>
          </S.PriceWrapper>
          <S.CloseButton onClick={handleClick}>닫기</S.CloseButton>
        </Modal>
      )}
    </>
  );
}

export default ProductPage;
