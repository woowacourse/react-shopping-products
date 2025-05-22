import Styled from "@emotion/styled";

export const ModalBackdrop = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const ModalOverlay = Styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1000;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalContent = Styled.div`
  padding: 20px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }

  hr {
    border: none;
    border-top: 1px solid #eaeaea;
    margin: 20px 0;
  }

  button {
    width: 100%;
    height: 48px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background-color: #333333;
    }
  }
`;

export const ModalHeader = Styled.div`
  padding: 20px 16px;
  border-bottom: none;
`;

export const Title = Styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

export const ItemsContainer = Styled.div`
  flex: 1;
  padding: 0 16px;
  overflow-y: auto;
`;

export const Divider = Styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0 16px;
`;

export const TotalSection = Styled.div`
  padding: 16px;
  text-align: center;
`;

export const TotalText = Styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 16px;
`;

export const Button = Styled.button`
  width: calc(100% - 32px);
  margin: 0 16px 16px 16px;
  padding: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
