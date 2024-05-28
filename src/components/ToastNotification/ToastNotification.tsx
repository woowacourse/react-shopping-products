import { StyledToast } from "./ToastNotification.styled";

export const ToastNotification = ({ errorMessage }: { errorMessage: string }) => {
  return <StyledToast>{errorMessage}</StyledToast>;
};
