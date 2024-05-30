import { ToastStateContext } from "@/provider/toastProvider";
import styled from "styled-components";
import React, { useContext } from "react";
import Toast from "@/components/_common/Toasts/Toast";

const Toasts = () => {
  const toasts = useContext(ToastStateContext);

  if (!toasts || toasts.length === 0) return null;

  return (
    <S.ToastContainer>
      {toasts.map((toast) => (
        <React.Fragment key={toast.id}>
          <Toast {...toast} />
        </React.Fragment>
      ))}
    </S.ToastContainer>
  );
};

export default Toasts;

const ToastContainer = styled.div`
  position: fixed;
  top: 64px;
  width: 100%;
  height: 50px;
`;

const S = {
  ToastContainer,
};
