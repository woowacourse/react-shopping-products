import { useContext } from "react";
import { ToastContext } from "../context/ToastContext/ToastContext";

// 에러 메시지를 사용하는 쪽 -> useToast 호출해서 showToast에 메시지 전달하면 끝
// 성공 메시지를 사용하는 쪽 -> useToast 호출해서 showToast에 메시지 전달하면 끝

const useToast = () => {
  const { showToast, isInToastProvider } = useContext(ToastContext);

  if (!isInToastProvider) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return {
    showToast,
  };
};

export default useToast;
