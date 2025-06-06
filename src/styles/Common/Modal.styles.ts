import styled from "@emotion/styled";

export const ModalBackground = styled.div<{
  isModalOpen: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  visibility: hidden;
  visibility: ${({ isModalOpen }) => (isModalOpen ? "visible" : "hidden")};
  opacity: ${({ isModalOpen }) => (isModalOpen ? "1" : "0")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  margin: 0 auto;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 430px;
  width: 450px;
  height: 500px;
  background-color: white;
  border-radius: 8px 8px 0 0;
  padding: 24px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  gap: 16px;
`;

export const ModalList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 180px;
  overflow-y: auto;
`;

export const ModalItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px;
  border-radius: 4px;
  gap: 16px;
  border-top: 1px solid #0000001a;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 397px;
  height: 88px;
  gap: 8px;
`;

export const ModalHeaderTitle = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 67px;
  height: 22px;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
`;

export const Modalimg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const ModalItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const ModalTitle = styled.span`
  max-width: 200px;
  height: 19px;
  top: 4px;
  font-weight: 700;
  font-size: 16px;
`;

export const ModalItemPrice = styled.span`
  max-width: 200px;
  height: 15px;
  font-weight: 500;
  font-size: 12px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #0000001a;
  margin-top: 12px;
  padding: 20px 10px;
`;

export const ModalFooterTitle = styled.span`
  width: 82px;
  height: 16px;
  font-weight: 700;
  font-size: 16px;
`;

export const ModalTotalPrice = styled.span`
  max-width: 200px;
  font-weight: 700;
  font-size: 24px;
`;

export const ModalCloseButton = styled.button`
  margin-top: 12px;
  background-color: #333333;
  color: white;
  width: 100%;
  height: 44px;
  border-radius: 5px;
  cursor: pointer;
`;

export const ModalDeleteImg = styled.img`
  width: 40px;
  height: 24px;
  cursor: pointer;
`;

export const ItemHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
