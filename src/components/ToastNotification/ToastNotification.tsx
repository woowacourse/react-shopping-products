import { ERROR_MESSAGE } from "../../constants/errorMessage";
import { useError } from "../../context/errorContext";
import { StyledToast } from "./ToastNotification.styled";

export const ToastNotification = () => {
  const { errorStatus } = useError();

  return errorStatus ? <StyledToast>{ERROR_MESSAGE[errorStatus.toString()]}</StyledToast> : null;
};
