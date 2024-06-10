import { ToastStateContext } from "@/provider/toastProvider";
import styled from "styled-components";
import React, { useContext } from "react";
import Toast from "@/components/_common/Toasts/Toast";
import { createPortal } from "react-dom";
import { Z_INDEX } from "@/constants/zIndex";

const Toasts = () => {
  const toasts = useContext(ToastStateContext);

  if (!toasts || toasts.length === 0) return null;

  const toastRoot = document.getElementById("toast");
  if (!toastRoot) return;

  return createPortal(
    <S.ToastContainer>
      {toasts.map((toast) => (
        <React.Fragment key={toast.id}>
          <Toast {...toast} />
        </React.Fragment>
      ))}
    </S.ToastContainer>,
    toastRoot
  );
};

export default Toasts;

const ToastContainer = styled.div`
  position: fixed;
  margin: 0 auto;
  top: 64px;
  width: 100vw;
  height: 50px;
  z-index: ${Z_INDEX.TOAST};
`;

const S = {
  ToastContainer,
};
