import { useError } from "../../context/errorContext";
import { StyledToast } from "./ToastNotification.styled";

export const ToastNotification = () => {
  const { errorMessage } = useError();

  return errorMessage ? <StyledToast>{errorMessage}</StyledToast> : null;
};
