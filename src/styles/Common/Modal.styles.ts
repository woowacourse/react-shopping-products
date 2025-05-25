import styled from "@emotion/styled";

export const StyledModalBackground = styled.div<{
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

export const StyledModalContainer = styled.div`
  position: absolute;
  top: 430px;
  width: 429px;
  height: 500px;
  background-color: white;
  border-radius: 8px 8px 0 0;
  padding: 24px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  gap: 16px;
`;

export const StyledModalList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 180px;
  overflow-y: auto;
`;

export const StyledModalItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px;
  border-radius: 4px;
  gap: 16px;
  border-top: 1px solid #0000001a;
`;

export const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 397px;
  height: 88px;
  gap: 8px;
`;

export const StyledModalHeaderTitle = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 67px;
  height: 22px;
  font-weight: 700;
  size: 18px;
  padding: 10px;
`;

export const StyledModalimg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const StyledModalItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

export const StyledModalTitle = styled.span`
  max-width: 200px;
  height: 19px;
  top: 4px;
  font-weight: 700;
  font-size: 16px;
`;

export const StyledModalItemPrice = styled.span`
  max-width: 200px;
  height: 15px;
  font-weight: 500;
  font-size: 12px;
`;

export const StyledModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #0000001a;
  margin-top: 12px;
  padding: 20px 10px;
`;

export const StyledModalFooterTitle = styled.span`
  width: 82px;
  height: 16px;
  font-weight: 700;
  font-size: 16px;
`;

export const StyledModalTotalPrice = styled.span`
  max-width: 200px;
  font-weight: 700;
  font-size: 24px;
`;

export const StyledModalCloseButton = styled.button`
  margin-top: 12px;
  background-color: #333333;
  color: white;
  width: 100%;
  height: 44px;
  border-radius: 5px;
  cursor: pointer;
`;

export const StyledModalDeleteImg = styled.img`
  width: 40px;
  height: 24px;
  cursor: pointer;
`;

export const StyledItemHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
