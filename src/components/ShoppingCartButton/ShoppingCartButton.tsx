import { createPortal } from "react-dom";
import Cart from "../../Modal/Cart/Cart";
import { ShoppingCartIcon } from "../../assets/index";
import * as S from "./ShoppingCartButton.style";
import { useState } from "react";
import fixScrollOutsideModal from "../../util/fixScrollOutsideModal";
import useFetchCartItem from "../../hooks/useFetchCartItem";

function ShoppingCartButton() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { fetchCartItemList } = useFetchCartItem();
  const quantity = fetchCartItemList.data?.content.length;

  fixScrollOutsideModal(isCartModalOpen);

  const handleClick = () => {
    setIsCartModalOpen(true);
  };
  return (
    <>
      {isCartModalOpen &&
        createPortal(
          <Cart setIsCartModalOpen={setIsCartModalOpen} />,
          document.body
        )}
      <S.Container onClick={handleClick}>
        <S.ShoppingCartIconContainer
          src={ShoppingCartIcon}
        ></S.ShoppingCartIconContainer>
        {quantity && (
          <S.ShoppingCartQuantityContainer>
            <S.ShoppingCartQuantity>{quantity}</S.ShoppingCartQuantity>
          </S.ShoppingCartQuantityContainer>
        )}
      </S.Container>
    </>
  );
}

export default ShoppingCartButton;
