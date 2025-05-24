import { css } from "@emotion/react";

const ModalLayout = (isOpen: boolean) => {
  return css`
    position: absolute;
    top: 0;
    display: ${isOpen ? "flex" : "none"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    z-index: 10;
  `;
};

const ModalBackdrop = css`
  width: 100%;
  height: 100%;
  background-color: #00000059;
`;

const ModalContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px 16px;
  width: 100%;
  background-color: white;
  box-sizing: border-box;
`;

const ModalTitle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 700;
  font-size: 18px;
`;

const ModalContent = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const ModalFooter = css`
  width: 100%;
`;

export {
  ModalLayout,
  ModalBackdrop,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalFooter,
};
