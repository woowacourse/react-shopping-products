import styled from '@emotion/styled';

const Common = {
  colors: {
    white: ' #ffffff',
    black: '#000000',
    grey: '#00000080',
  },
  zIndex: {
    modalBackground: 100,
    modalContainer: 200,
  },
};

export const ModalBackground = styled.div<{
  isOpen: boolean;
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${Common.colors.grey};
  backdrop-filter: blur(10%);
  width: 100%;
  min-width: 376px;
  height: 100%;
  margin: 0 auto;
  z-index: ${Common.zIndex.modalBackground};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => isOpen && '1'};
  }};
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: ${Common.colors.white};
  color: ${Common.colors.black};
  height: auto;
  // height: 20%;
  // min-height: 150px;
  padding: 30px 35px;
  z-index: ${Common.zIndex.modalContainer};
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px 10px 0 0;
`;
