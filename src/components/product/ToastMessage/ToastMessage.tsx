import styled from "@emotion/styled";
import { createPortal } from "react-dom";

interface ToastMessageProps {
  toastMessage: string;
  toastType: "pending" | "success" | "error";
}

function ToastMessage({ toastMessage, toastType }: ToastMessageProps) {
  return createPortal(
    <Container toastType={toastType}>
      <p>{toastMessage}</p>
    </Container>,
    document.body
  );
}

export default ToastMessage;

const Container = styled.div<Pick<ToastMessageProps, "toastType">>`
  min-width: 430px;
  height: 40px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);

  padding: 12px 77px;
  background-color: ${({ toastType }) =>
    toastType === "error" ? "#ffc9c9" : "#c9ffc9"};
  color: #000000;
`;
