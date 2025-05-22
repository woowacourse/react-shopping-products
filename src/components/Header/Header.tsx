import * as S from "./Header.styled";
import BagIcon from "../Icon/BagIcon";
import { ResponseCartItem } from "../../api/types";
import { useState } from "react";
import Modal from "../common/Modal/Modal";

function Header({ cartItemList }: { cartItemList: ResponseCartItem[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <S.HeaderContainer>
        <S.HeaderTitle>SHOP</S.HeaderTitle>
        <S.HeaderIconContainer onClick={handleModalOpen}>
          <BagIcon />
          {cartItemList.length > 0 && (
            <S.CartBadge>{cartItemList.length}</S.CartBadge>
          )}
        </S.HeaderIconContainer>
      </S.HeaderContainer>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div>
          <h2>장바구니</h2>

          <hr />
          <div>
            <p>
              총 결제금액{" "}
              {cartItemList
                .reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )
                .toLocaleString()}
              원
            </p>
          </div>
          <button>주문하기</button>
        </div>
      </Modal>
    </>
  );
}

export default Header;
